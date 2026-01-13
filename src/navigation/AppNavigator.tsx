import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../features/issues/types";
import IssuesListScreen from "../features/issues/screens/IssuesListScreen";
import IssueDetailsScreen from "../features/issues/screens/IssueDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="IssuesList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="IssuesList" component={IssuesListScreen} />
      <Stack.Screen
        name="IssueDetails"
        component={IssueDetailsScreen}
        options={{
          title: "Issue Details",
        }}
      />
    </Stack.Navigator>
  );
}
