"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, LogOut, Settings, Mail, User, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Consultation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      fetchConsultations();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("admin_credentials")
      .select("*")
      .eq("username", username)
      .eq("password_hash", password)
      .single();

    setLoading(false);

    if (fetchError || !data) {
      setError("Invalid username or password");
      return;
    }

    sessionStorage.setItem("adminLoggedIn", "true");
    setIsLoggedIn(true);
    fetchConsultations();
  };

  const fetchConsultations = async () => {
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setConsultations(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("consultations").update({ status }).eq("id", id);
    fetchConsultations();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;

    const { error } = await supabase
      .from("admin_credentials")
      .update({ username: newUsername, password_hash: newPassword, updated_at: new Date().toISOString() })
      .eq("username", "admin");

    if (!error) {
      setSettingsSuccess(true);
      setTimeout(() => {
        setSettingsSuccess(false);
        setShowSettings(false);
        handleLogout();
      }, 2000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-zinc-500">Study Easy Administration Portal</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Study Easy Admin</h1>
              <p className="text-xs text-zinc-500">Manage consultations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Credentials</DialogTitle>
                </DialogHeader>
                {settingsSuccess ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-center">
                    Credentials updated! Please log in again.
                  </div>
                ) : (
                  <form onSubmit={handleUpdateCredentials} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Username</label>
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter new username"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Update Credentials
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Total Requests</p>
                  <p className="text-2xl font-bold">{consultations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Pending</p>
                  <p className="text-2xl font-bold">{consultations.filter(c => c.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Completed</p>
                  <p className="text-2xl font-bold">{consultations.filter(c => c.status === "completed").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.length === 0 ? (
              <p className="text-center py-8 text-zinc-500">No consultation requests yet.</p>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-zinc-400" />
                        <span className="font-medium">{consultation.first_name} {consultation.last_name}</span>
                        <Badge variant={consultation.status === "pending" ? "secondary" : consultation.status === "completed" ? "default" : "destructive"}>
                          {consultation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-500 mb-1">{consultation.email}</p>
                      <p className="text-sm font-medium">{consultation.subject}</p>
                      <p className="text-xs text-zinc-400 mt-1">
                        {new Date(consultation.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedConsultation(consultation)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Consultation Details</DialogTitle>
                          </DialogHeader>
                            {selectedConsultation && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-zinc-500">Name</label>
                                  <p>{selectedConsultation.first_name} {selectedConsultation.last_name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-zinc-500">Email</label>
                                  <p>{selectedConsultation.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-zinc-500">Phone</label>
                                  <p>{selectedConsultation.phone || "Not provided"}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-zinc-500">Subject</label>
                                  <p>{selectedConsultation.subject}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-zinc-500">Message</label>
                                  <p className="whitespace-pre-wrap">{selectedConsultation.message}</p>
                                </div>
                              </div>
                            )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => updateStatus(consultation.id, "completed")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => updateStatus(consultation.id, "rejected")}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
