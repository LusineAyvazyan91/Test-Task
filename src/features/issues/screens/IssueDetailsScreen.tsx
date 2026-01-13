import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Issue } from "../types";
import { Text } from "@/ui/Text";
import { Button } from "@/ui/Button";
import { Colors } from "@/utils/colors";
import { formatDate } from "@/utils/issueUtils";
import { SegmentControl, SegmentOption } from "../components/SegmentControl";
import { BadgeStatus } from "../components/BadgeStatus";
import { useUpdateIssue } from "../hooks/useUpdateIssues";
import { useIssue } from "../hooks/useIssue";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import ClockIcon from "../../../../assets/svgs/clock.svg";
import PriorityUpIcon from "../../../../assets/svgs/priority-up.svg";
import PriorityMediumIcon from "../../../../assets/svgs/priority-medium.svg";
import PriorityDownIcon from "../../../../assets/svgs/priority-down.svg";
import SystemRestartIcon from "../../../../assets/svgs/system-restart.svg";
import CheckCircleIcon from "../../../../assets/svgs/check-circle-solid.svg";
import ArrowLeftIcon from "../../../../assets/svgs/arrow-left.svg";
import SparksIcon from "../../../../assets/svgs/sparks.svg";
import TaskListIcon from "../../../../assets/svgs/task-list.svg";

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

  // Early return if no issue data
  if (!isLoading && !issue) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={["top"]}>
        <Text type="subtitle1" color="dark100">
          Issue not found
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text type="subtitle1" color="purple60">
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  const [priority, setPriority] = useState<Issue["priority"]>("low");
  const [status, setStatus] = useState<Issue["status"]>("open");
  const updateIssueMutation = useUpdateIssue();
  const isOnline = useNetworkStatus();

  // Check if there are unsaved changes
  const hasUnsavedChanges = issue
    ? priority !== issue.priority || status !== issue.status
    : false;

  // Determine badge status based on network and mutation state
  const getBadgeStatus = ():
    | "pending-sync"
    | "offline-mode"
    | "synchronized" => {
    // If offline, always show offline mode
    if (!isOnline) {
      return "offline-mode";
    }
    // If mutation is pending, show pending sync
    if (updateIssueMutation.isPending) {
      return "pending-sync";
    }
    // If mutation succeeded and no unsaved changes, show synchronized
    if (updateIssueMutation.isSuccess && !hasUnsavedChanges) {
      return "synchronized";
    }
    // If there are unsaved changes, show pending sync
    if (hasUnsavedChanges) {
      return "pending-sync";
    }
    // Default to synchronized if everything is synced
    return "synchronized";
  };

  const badgeStatus = getBadgeStatus();

  // Initialize priority and status from issue data
  useEffect(() => {
    if (issue) {
      setPriority(issue.priority);
      setStatus(issue.status);
    }
  }, [issue?.id, issue?.priority, issue?.status]);

  const priorityOptions: SegmentOption<Issue["priority"]>[] = useMemo(
    () => [
      {
        label: "Low",
        value: "low",
        icon: <PriorityDownIcon width={16} height={16} />,
      },
      {
        label: "Medium",
        value: "medium",
        icon: <PriorityMediumIcon width={16} height={16} />,
      },
      {
        label: "High",
        value: "high",
        icon: <PriorityUpIcon width={16} height={16} />,
      },
    ],
    []
  );

  const statusOptions: SegmentOption<Issue["status"]>[] = useMemo(
    () => [
      {
        label: "Opened",
        value: "open",
        icon: <SystemRestartIcon width={16} height={16} />,
      },
      {
        label: "Closed",
        value: "closed",
        icon: <CheckCircleIcon width={16} height={16} />,
      },
    ],
    []
  );

  useEffect(() => {
    if (issue?.id) {
      navigation.setOptions({
        title: `Issue #${issue.id}`,
      });
    }
  }, [issue?.id, navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={["top"]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
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
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                accessible={true}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <ArrowLeftIcon width={20} height={20} />
                <Text
                  type="bodyRegular"
                  color="purple60"
                  style={styles.backButtonText}
                >
                  Go Back
                </Text>
              </TouchableOpacity>
              <BadgeStatus status={badgeStatus} />
            </View>

            <Text type="h1" style={styles.issueTitle}>
              {issue?.title}
            </Text>

            <View style={styles.lastUpdatedRow}>
              <ClockIcon width={16} height={16} color={Colors.dark80} />
              <Text type="body2" color="dark80" style={styles.lastUpdatedText}>
                Last Updated:{" "}
                <Text type="bodyRegular" color="dark100">
                  {formatDate(issue?.updatedAt || "")}
                </Text>
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <SparksIcon width={20} height={20} />
                <Text
                  type="bodyRegular"
                  color="dark80"
                  style={styles.sectionTitleWithIcon}
                >
                  Priority
                </Text>
              </View>
              <SegmentControl
                options={priorityOptions}
                selectedValue={priority}
                onValueChange={(value) => setPriority(value)}
              />
            </View>
            <View style={styles.sectionSeparator} />

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TaskListIcon width={20} height={20} />
                <Text
                  type="bodyRegular"
                  color="dark80"
                  style={styles.sectionTitleWithIcon}
                >
                  Status
                </Text>
              </View>
              <SegmentControl
                options={statusOptions}
                selectedValue={status}
                onValueChange={(value) => setStatus(value)}
              />
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.descriptionContainer}>
          <Text type="subtitle1" style={styles.descriptionTitle}>
            Description
          </Text>
          <Text type="bodyRegular" color="dark80">
            {issue?.description}
          </Text>
        </View>
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
  descriptionTitle: {
    marginBottom: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 22,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    paddingBottom: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 8,
  },
  issueTitle: {
    marginVertical: 12,
  },
  lastUpdatedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  lastUpdatedText: {
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  sectionTitleWithIcon: { marginLeft: 8 },
  description: {
    lineHeight: 24,
    marginTop: 0,
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
