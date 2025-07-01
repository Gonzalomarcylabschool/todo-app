"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  Search,
  Check,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  Bell,
  Settings,
  LogOut,
  CheckSquare,
  Square,
  AlertCircle,
  Clock,
  Target,
  X,
  CalendarDays,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  categoryId: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  color: string
}

interface Filters {
  status: "all" | "completed" | "pending"
  priority: "all" | "low" | "medium" | "high"
  category: string
  dueDateRange: "all" | "today" | "week" | "month" | "overdue"
}

// Sample data
const initialCategories: Category[] = [
  { id: "1", name: "Work", color: "#3b82f6" },
  { id: "2", name: "Personal", color: "#10b981" },
  { id: "3", name: "Shopping", color: "#f59e0b" },
  { id: "4", name: "Health", color: "#ef4444" },
]

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the Q4 project proposal and send it to the team for review",
    completed: false,
    priority: "high",
    dueDate: "2024-01-15",
    categoryId: "1",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Get milk, bread, eggs, and vegetables for the week",
    completed: true,
    priority: "medium",
    dueDate: "2024-01-12",
    categoryId: "3",
    createdAt: "2024-01-11",
  },
  {
    id: "3",
    title: "Schedule dentist appointment",
    description: "Call Dr. Smith's office to schedule routine cleaning",
    completed: false,
    priority: "low",
    dueDate: "2024-01-20",
    categoryId: "4",
    createdAt: "2024-01-09",
  },
  {
    id: "4",
    title: "Review code changes",
    description: "Review the pull requests from the development team",
    completed: false,
    priority: "high",
    dueDate: "2024-01-08",
    categoryId: "1",
    createdAt: "2024-01-08",
  },
]

export default function TodoDashboard() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    priority: "all",
    category: "all",
    dueDateRange: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTodos, setSelectedTodos] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
    categoryId: "",
  })
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#3b82f6",
  })

  // Filter todos based on current filters and search
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Search filter
      if (
        searchQuery &&
        !todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (filters.status === "completed" && !todo.completed) return false
      if (filters.status === "pending" && todo.completed) return false

      // Priority filter
      if (filters.priority !== "all" && todo.priority !== filters.priority) return false

      // Category filter
      if (filters.category !== "all" && todo.categoryId !== filters.category) return false

      // Due date filter
      if (filters.dueDateRange !== "all") {
        const today = new Date()
        const dueDate = new Date(todo.dueDate)

        switch (filters.dueDateRange) {
          case "today":
            if (dueDate.toDateString() !== today.toDateString()) return false
            break
          case "week":
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
            if (dueDate > weekFromNow) return false
            break
          case "month":
            const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
            if (dueDate > monthFromNow) return false
            break
          case "overdue":
            if (dueDate >= today || todo.completed) return false
            break
        }
      }

      return true
    })
  }, [todos, filters, searchQuery])

  // Statistics
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    const overdue = todos.filter((t) => !t.completed && new Date(t.dueDate) < new Date()).length

    return { total, completed, pending, overdue }
  }, [todos])

  // Handlers
  const handleCreateTodo = () => {
    if (!newTodo.title.trim()) return

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      dueDate: newTodo.dueDate,
      categoryId: newTodo.categoryId,
      createdAt: new Date().toISOString(),
    }

    setTodos([...todos, todo])
    setNewTodo({ title: "", description: "", priority: "medium", dueDate: "", categoryId: "" })
    setIsCreateModalOpen(false)
  }

  const handleUpdateTodo = () => {
    if (!editingTodo || !newTodo.title.trim()) return

    setTodos(todos.map((todo) => (todo.id === editingTodo.id ? { ...todo, ...newTodo } : todo)))
    setEditingTodo(null)
    setNewTodo({ title: "", description: "", priority: "medium", dueDate: "", categoryId: "" })
  }

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setSelectedTodos(selectedTodos.filter((selectedId) => selectedId !== id))
  }

  const handleBulkAction = (action: "complete" | "delete" | "category", value?: string) => {
    if (action === "complete") {
      setTodos(todos.map((todo) => (selectedTodos.includes(todo.id) ? { ...todo, completed: true } : todo)))
    } else if (action === "delete") {
      setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)))
    } else if (action === "category" && value) {
      setTodos(todos.map((todo) => (selectedTodos.includes(todo.id) ? { ...todo, categoryId: value } : todo)))
    }
    setSelectedTodos([])
  }

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) return

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      color: newCategory.color,
    }

    setCategories([...categories, category])
    setNewCategory({ name: "", color: "#3b82f6" })
    setIsCategoryModalOpen(false)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.name.trim()) return

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: newCategory.name, color: newCategory.color } : cat,
      ),
    )
    setEditingCategory(null)
    setNewCategory({ name: "", color: "#3b82f6" })
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    // Move todos from deleted category to uncategorized
    setTodos(todos.map((todo) => (todo.categoryId === id ? { ...todo, categoryId: "" } : todo)))
  }

  const openEditTodo = (todo: Todo) => {
    setEditingTodo(todo)
    setNewTodo({
      title: todo.title,
      description: todo.description,
      priority: todo.priority as "low" | "medium" | "high",
      dueDate: todo.dueDate,
      categoryId: todo.categoryId,
    })
    setIsCreateModalOpen(true)
  }

  const openEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      color: category.color,
    })
    setIsCategoryModalOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <Target className="h-3 w-3" />
      default:
        return null
    }
  }

  const isOverdue = (dueDate: string, completed: boolean) => {
    return !completed && new Date(dueDate) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">TodoApp</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Todo
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Statistics */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="flex items-center">
                    <Target className="h-4 w-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-lg font-semibold">{stats.total}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Completed</p>
                      <p className="text-lg font-semibold">{stats.completed}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Pending</p>
                      <p className="text-lg font-semibold">{stats.pending}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Overdue</p>
                      <p className="text-lg font-semibold">{stats.overdue}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Status</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Todos" },
                    { value: "pending", label: "Pending" },
                    { value: "completed", label: "Completed" },
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFilters({ ...filters, status: status.value as any })}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.status === status.value
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Priority</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Priorities" },
                    { value: "high", label: "High Priority" },
                    { value: "medium", label: "Medium Priority" },
                    { value: "low", label: "Low Priority" },
                  ].map((priority) => (
                    <button
                      key={priority.value}
                      onClick={() => setFilters({ ...filters, priority: priority.value as any })}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.priority === priority.value
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Due Date</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Dates" },
                    { value: "today", label: "Due Today" },
                    { value: "week", label: "This Week" },
                    { value: "month", label: "This Month" },
                    { value: "overdue", label: "Overdue" },
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setFilters({ ...filters, dueDateRange: range.value as any })}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.dueDateRange === range.value
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ ...filters, category: "all" })}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      filters.category === "all"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <button
                        onClick={() => setFilters({ ...filters, category: category.id })}
                        className={`flex-1 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          filters.category === category.id
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                          {category.name}
                        </div>
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditCategory(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Bulk Actions */}
            {selectedTodos.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    {selectedTodos.length} todo{selectedTodos.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("complete")}>
                      <Check className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                    <Select onValueChange={(value: string) => handleBulkAction("category", value)}>
                      <SelectTrigger className="w-40 h-8">
                        <SelectValue placeholder="Change Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("delete")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedTodos([])}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Todo List */}
            <div className="space-y-4">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery || Object.values(filters).some((f) => f !== "all")
                      ? "Try adjusting your search or filters"
                      : "Create your first todo to get started"}
                  </p>
                  {!searchQuery && Object.values(filters).every((f) => f === "all") && (
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Todo
                    </Button>
                  )}
                </div>
              ) : (
                filteredTodos.map((todo) => {
                  const category = categories.find((c) => c.id === todo.categoryId)
                  const overdue = isOverdue(todo.dueDate, todo.completed)

                  return (
                    <Card
                      key={todo.id}
                      className={`transition-all hover:shadow-md ${
                        selectedTodos.includes(todo.id) ? "ring-2 ring-blue-500" : ""
                      } ${todo.completed ? "opacity-75" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={selectedTodos.includes(todo.id)}
                              onCheckedChange={(checked: boolean | "indeterminate") => {
                                if (checked === true) {
                                  setSelectedTodos([...selectedTodos, todo.id])
                                } else {
                                  setSelectedTodos(selectedTodos.filter((id) => id !== todo.id))
                                }
                              }}
                            />
                            <button onClick={() => handleToggleTodo(todo.id)} className="flex-shrink-0">
                              {todo.completed ? (
                                <CheckSquare className="h-5 w-5 text-green-600" />
                              ) : (
                                <Square className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3
                                  className={`text-lg font-medium ${
                                    todo.completed ? "line-through text-gray-500" : "text-gray-900"
                                  }`}
                                >
                                  {todo.title}
                                </h3>
                                {todo.description && (
                                  <p className={`mt-1 text-sm ${todo.completed ? "text-gray-400" : "text-gray-600"}`}>
                                    {todo.description.length > 100
                                      ? `${todo.description.substring(0, 100)}...`
                                      : todo.description}
                                  </p>
                                )}

                                <div className="flex items-center space-x-4 mt-3">
                                  <Badge className={`${getPriorityColor(todo.priority)} border-0`}>
                                    {getPriorityIcon(todo.priority)}
                                    <span className="ml-1 capitalize">{todo.priority}</span>
                                  </Badge>

                                  {category && (
                                    <Badge variant="outline" className="border-0 bg-gray-50">
                                      <div
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{ backgroundColor: category.color }}
                                      />
                                      {category.name}
                                    </Badge>
                                  )}

                                  <Badge
                                    variant="outline"
                                    className={`border-0 ${overdue ? "bg-red-50 text-red-700" : "bg-gray-50"}`}
                                  >
                                    <CalendarDays className="h-3 w-3 mr-1" />
                                    {formatDate(todo.dueDate)}
                                    {overdue && " (Overdue)"}
                                  </Badge>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditTodo(todo)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleTodo(todo.id)}>
                                    {todo.completed ? (
                                      <>
                                        <Square className="mr-2 h-4 w-4" />
                                        Mark Incomplete
                                      </>
                                    ) : (
                                      <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Mark Complete
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDeleteTodo(todo.id)} className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Todo Create/Edit Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingTodo ? "Edit Todo" : "Create New Todo"}</DialogTitle>
            <DialogDescription>
              {editingTodo ? "Update your todo details below." : "Add a new todo to your list."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTodo.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Enter todo title..."
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTodo.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Enter todo description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTodo.priority}
                  onValueChange={(value: any) => setNewTodo({ ...newTodo, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newTodo.categoryId}
                onValueChange={(value: string) => setNewTodo({ ...newTodo, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false)
                setEditingTodo(null)
                setNewTodo({ title: "", description: "", priority: "medium", dueDate: "", categoryId: "" })
              }}
            >
              Cancel
            </Button>
            <Button onClick={editingTodo ? handleUpdateTodo : handleCreateTodo}>
              {editingTodo ? "Update Todo" : "Create Todo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Create/Edit Modal */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update your category details below."
                : "Add a new category for organizing your todos."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={newCategory.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name..."
              />
            </div>

            <div>
              <Label htmlFor="categoryColor">Color</Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="categoryColor"
                  type="color"
                  value={newCategory.color}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-16 h-10 p-1 border rounded"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: newCategory.color }} />
                  <span className="text-sm text-gray-600">{newCategory.color}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCategoryModalOpen(false)
                setEditingCategory(null)
                setNewCategory({ name: "", color: "#3b82f6" })
              }}
            >
              Cancel
            </Button>
            <Button onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}>
              {editingCategory ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
