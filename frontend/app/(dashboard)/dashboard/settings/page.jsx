"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Save, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

export default function SettingsPage() {
    const { user, loading: userLoading } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        university: "State University",
        major: "Computer Science",
        year: "Junior",
    });

    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                name: user.displayName || "",
                email: user.email || ""
            }));
        }
    }, [user]);

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        taskReminders: true,
        eventUpdates: true,
        weeklyDigest: false,
    });
    const handleSave = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary"/>
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" value={profile.university} onChange={(e) => setProfile({ ...profile, university: e.target.value })}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" value={profile.major} onChange={(e) => setProfile({ ...profile, major: e.target.value })}/>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary"/>
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch checked={notifications.email} onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}/>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch checked={notifications.push} onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}/>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Task Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded about upcoming deadlines
                </p>
              </div>
              <Switch checked={notifications.taskReminders} onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}/>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Event Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about saved events
                </p>
              </div>
              <Switch checked={notifications.eventUpdates} onCheckedChange={(checked) => setNotifications({ ...notifications, eventUpdates: checked })}/>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly summary of your productivity
                </p>
              </div>
              <Switch checked={notifications.weeklyDigest} onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}/>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary"/>
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of the app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for the interface
                </p>
              </div>
              <Switch defaultChecked/>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary"/>
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <div>
              <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                Delete Account
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                This action is irreversible. All your data will be permanently deleted.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (<>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Saving...
              </>) : (<>
                <Save className="mr-2 h-4 w-4"/>
                Save Changes
              </>)}
          </Button>
        </div>
      </div>
    </div>);
}
