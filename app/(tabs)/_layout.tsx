import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from 'expo-router';
import { LogoutComponent } from '@/components/LogOutComponent';

const activeColor = "#1ED2AF";
const inactiveColor = "#FEF9E6"


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: true,
        headerRight: () => <LogoutComponent></LogoutComponent>,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
          <Ionicons name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="add-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="heart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          title: 'My Profile',
          href: null,
        }}
      />
    </Tabs>
  );
}

