"use client";

import { useEffect, useState } from "react";
import { UserResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2 } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [results, setResults] = useState<UserResult[]>([]);
    const [loading, setLoading] = useState(false);

    // Hardcoded simple password for this local app
    const ADMIN_PASS = "admin123";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setIsAuthenticated(true);
            fetchResults();
        } else {
            alert("Incorrect password");
        }
    };

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/results');
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Prepare chart data: Distribution of Types
    const typeCounts = results.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(typeCounts).map(([name, count]) => ({
        name,
        count
    })).sort((a, b) => b.count - a.count);

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"];

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Team Dynamics Dashboard</h1>
                <Button variant="outline" onClick={() => { setIsAuthenticated(false); setResults([]); }}>Logout</Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{results.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Dominant Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{chartData[0]?.name || "N/A"}</div>
                            </CardContent>
                        </Card>
                        {/* Placeholders for more metrics */}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Personality Type Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis dataKey="name" className="text-xs" tick={{ fill: 'var(--foreground)' }} />
                                            <YAxis allowDecimals={false} className="text-xs" tick={{ fill: 'var(--foreground)' }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                                itemStyle={{ color: 'var(--foreground)' }}
                                                cursor={{ fill: 'var(--accent)', opacity: 0.2 }}
                                            />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {results.slice(0, 5).map((user) => (
                                        <div key={user.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                            <div>
                                                <p className="font-medium text-sm leading-none">{user.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(user.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="font-bold text-primary">{user.type}</div>
                                        </div>
                                    ))}
                                    {results.length === 0 && <p className="text-muted-foreground text-sm">No results yet.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
