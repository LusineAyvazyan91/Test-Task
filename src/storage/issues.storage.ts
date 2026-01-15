import AsyncStorage from "@react-native-async-storage/async-storage";
import { Issue } from "../features/issues/types";
import { logger } from "../utils/logger";

const KEY = "issues-cache";
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

interface CachedData {
  issues: Issue[];
  timestamp: number;
}

export const loadIssues = async (): Promise<Issue[] | undefined> => {
  try {
    const rawData = await AsyncStorage.getItem(KEY);

    if (!rawData) {
      return undefined;
    }

    const cachedData: CachedData = JSON.parse(rawData);
    const now = Date.now();

    if (now - cachedData.timestamp > CACHE_TTL_MS) {
      await AsyncStorage.removeItem(KEY);
      return undefined;
    }

    return cachedData.issues;
  } catch (error) {
    logger.error("Error loading cached issues:", error);
    return undefined;
  }
};

export const saveIssues = async (issues: Issue[]) => {
  try {
    const timestamp = Date.now();
    const cachedData: CachedData = {
      issues,
      timestamp,
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(cachedData));
  } catch (error) {
    logger.error("Error saving issues to cache:", error);
  }
};
