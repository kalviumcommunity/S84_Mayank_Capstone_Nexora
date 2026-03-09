"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Filter, Calendar, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
const initialTasks = [
    { id: 1, title: "Research Paper - Psychology 101", course: "PSY 101", dueDate: "2026-01-22", priority: "high", completed: false, category: "Assignment" },
    { id: 2, title: "Group Project - Marketing", course: "MKT 201", dueDate: "2026-01-24", priority: "medium", completed: false, category: "Project" },
    { id: 3, title: "Lab Report - Chemistry", course: "CHM 102", dueDate: "2026-01-26", priority: "low", completed: false, category: "Lab" },
    { id: 4, title: "Midterm Study - Economics", course: "ECO 201", dueDate: "2026-01-28", priority: "high", completed: false, category: "Exam" },
    { id: 5, title: "Reading Assignment - History", course: "HIS 101", dueDate: "2026-01-23", priority: "low", completed: true, category: "Reading" },
    { id: 6, title: "Problem Set 5 - Statistics", course: "STA 201", dueDate: "2026-01-25", priority: "medium", completed: false, category: "Assignment" },
];
const Loading = () => null;
export default function TasksPage() {
    const searchParams = useSearchParams();
    const [tasks, setTasks] = useState(initialTasks);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        course: "",
        dueDate: "",
        priority: "medium",
        category: "Assignment",
    });
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.course.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
        return matchesSearch && matchesPriority;
    });
    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    const addTask = () => {
        if (!newTask.title || !newTask.dueDate)
            return;
        const task = {
            id: Date.now(),
            ...newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask({
            title: "",
            course: "",
            dueDate: "",
            priority: "medium",
            category: "Assignment",
        });
        setIsDialogOpen(false);
    };
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.filter(t => !t.completed).length;
    return (<Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage your assignments and deadlines</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4"/>
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your list
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" placeholder="e.g., PSY 101" value={newTask.course} onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Lab">Lab</SelectItem>
                        <SelectItem value="Reading">Reading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addTask}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{completedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input placeholder="Search tasks..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground"/>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priority"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredTasks.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                  No tasks found. Try adjusting your filters or add a new task.
                </div>) : (filteredTasks.map((task) => (<div key={task.id} className={`flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors ${task.completed ? "opacity-60" : ""}`}>
                    <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)}/>
                    <div className={`h-2 w-2 rounded-full ${task.priority === "high" ? "bg-destructive" :
                task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}/>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded">{task.course}</span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded">{task.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4"/>
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            })}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </div>
                  </div>)))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>);
}
