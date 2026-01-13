import AsyncStorage from "@react-native-async-storage/async-storage";
import { Issue } from "../features/issues/types";

const KEY = "issues-cache";
const TIMESTAMP_KEY = "issues-cache-timestamp";
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

interface CachedData {
  issues: Issue[];
  timestamp: number;
}

export const loadIssues = async (): Promise<Issue[] | undefined> => {
  try {
    const [rawData, rawTimestamp] = await Promise.all([
      AsyncStorage.getItem(KEY),
      AsyncStorage.getItem(TIMESTAMP_KEY),
    ]);

    if (!rawData || !rawTimestamp) {
      return undefined;
    }

    const timestamp = parseInt(rawTimestamp, 10);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL_MS) {
      await Promise.all([
        AsyncStorage.removeItem(KEY),
        AsyncStorage.removeItem(TIMESTAMP_KEY),
      ]);
      return undefined;
    }

    const cachedData: CachedData = JSON.parse(rawData);
    return cachedData.issues;
  } catch (error) {
    console.error("Error loading cached issues:", error);
    return undefined;
  }
};

export const saveIssues = async (issues: Issue[]) => {
  try {
    const cachedData: CachedData = {
      issues,
      timestamp: Date.now(),
    };
    await Promise.all([
      AsyncStorage.setItem(KEY, JSON.stringify(cachedData)),
      AsyncStorage.setItem(TIMESTAMP_KEY, Date.now().toString()),
    ]);
  } catch (error) {
    console.error("Error saving issues to cache:", error);
  }
};
