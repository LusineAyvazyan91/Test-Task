import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Issue } from "../types";
import { Button } from "@/ui/Button";
import { Colors } from "@/utils/colors";
import { IssueDetailsHeader } from "../components/IssueDetailsHeader";
import { IssuePrioritySection } from "../components/IssuePrioritySection";
import { IssueStatusSection } from "../components/IssueStatusSection";
import { IssueDescription } from "../components/IssueDescription";
import { IssueDetailsLoading } from "../components/IssueDetailsLoading";
import { IssueDetailsError } from "../components/IssueDetailsError";
import { useUpdateIssue } from "../hooks/useUpdateIssues";
import { useIssue } from "../hooks/useIssue";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

type IssueDetailsRouteProp = RouteProp<RootStackParamList, "IssueDetails">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IssueDetails"
>;

export default function IssueDetailsScreen() {
  const route = useRoute<IssueDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { issueId } = route.params;
  const { data: issue, isLoading, error } = useIssue(issueId);
  const [priority, setPriority] = useState<Issue["priority"]>("low");
  const [status, setStatus] = useState<Issue["status"]>("open");
  const updateIssueMutation = useUpdateIssue();
  const isOnline = useNetworkStatus();

  const hasUnsavedChanges = issue
    ? priority !== issue.priority || status !== issue.status
    : false;
  const getBadgeStatus = ():
    | "pending-sync"
    | "offline-mode"
    | "synchronized" => {
    if (!isOnline) {
      return "offline-mode";
    }
    if (updateIssueMutation.isPending) {
      return "pending-sync";
    }
    if (updateIssueMutation.isSuccess && !hasUnsavedChanges) {
      return "synchronized";
    }
    if (hasUnsavedChanges) {
      return "pending-sync";
    }
    return "synchronized";
  };

  const badgeStatus = getBadgeStatus();

  useEffect(() => {
    if (issue) {
      setPriority(issue.priority);
      setStatus(issue.status);
    }
  }, [issue?.id, issue?.priority, issue?.status]);

  useEffect(() => {
    if (issue?.id) {
      navigation.setOptions({
        title: `Issue #${issue.id}`,
      });
    }
  }, [issue?.id, navigation]);

  if (isLoading) {
    return <IssueDetailsLoading />;
  }

  if (!issue) {
    return <IssueDetailsError onBackPress={() => navigation.goBack()} />;
  }

  const handleSave = () => {
    if (!issue) return;

    const updatedAt = new Date().toISOString();
    const originalPriority = issue.priority;
    const originalStatus = issue.status;

    updateIssueMutation.mutate(
      {
        id: issue.id,
        data: {
          priority,
          status,
          updatedAt,
        },
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigation.goBack();
          }, 300);
        },
        onError: () => {
          setPriority(originalPriority);
          setStatus(originalStatus);
        },
      }
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <SafeAreaView style={styles.container} edges={["top"]}>
          <IssueDetailsHeader
            issue={issue}
            badgeStatus={badgeStatus}
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.sectionsContainer}>
            <IssuePrioritySection
              priority={priority}
              onPriorityChange={setPriority}
            />
            <View style={styles.sectionSeparator} />
            <IssueStatusSection status={status} onStatusChange={setStatus} />
          </View>
        </SafeAreaView>

        <IssueDescription description={issue.description} />
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <Button
          title="Save"
          onPress={handleSave}
          variant="primary"
          disabled={updateIssueMutation.isPending}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 100,
  },
  sectionsContainer: {
    paddingHorizontal: 16,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: Colors.gray40,
    marginVertical: 16,
    width: "100%",
  },
});
