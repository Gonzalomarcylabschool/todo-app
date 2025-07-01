const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/";

export async function getTodos(token: string) {
  const res = await fetch(`${API_BASE}todos/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(data: any, token: string) {
  const transformedData = {
    ...data,
    due_date: data.dueDate,
    category: data.categoryId ? parseInt(data.categoryId) : null
  };
  delete transformedData.dueDate;
  delete transformedData.categoryId;
  
  const res = await fetch(`${API_BASE}todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transformedData)
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id: number, data: any, token: string) {
  const transformedData = { ...data };
  if (data.dueDate) {
    transformedData.due_date = data.dueDate;
    delete transformedData.dueDate;
  }
  if (data.categoryId !== undefined) {
    transformedData.category = data.categoryId ? parseInt(data.categoryId) : null;
    delete transformedData.categoryId;
  }
  
  const res = await fetch(`${API_BASE}todos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transformedData)
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id: number, token: string) {
  const res = await fetch(`${API_BASE}todos/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
}

export async function getCategories(token: string) {
  const res = await fetch(`${API_BASE}categories/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(data: any, token: string) {
  const res = await fetch(`${API_BASE}categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(id: number, data: any, token: string) {
  const res = await fetch(`${API_BASE}categories/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: number, token: string) {
  const res = await fetch(`${API_BASE}categories/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return true;
}

export async function registerUser(username: string, password: string, email?: string) {
  const res = await fetch(`${API_BASE}register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to register user");
  }
  return res.json();
}

export async function refreshToken(refreshToken: string) {
  const res = await fetch(`${API_BASE}token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken })
  });
  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }
  return res.json();
} 