// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API client class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Try to get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(username: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${this.baseURL}/api/v1/auth/login/access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async register(email: string, username: string, password: string, full_name: string) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password, full_name }),
    });
  }

  async getCurrentUser() {
    return this.request('/api/v1/auth/me');
  }

  // Portfolio endpoints
  async getPortfolios() {
    return this.request('/api/v1/portfolio/');
  }

  async getPortfolio(portfolioId: string) {
    return this.request(`/api/v1/portfolio/${portfolioId}`);
  }

  async createPortfolio(portfolioData: any) {
    return this.request('/api/v1/portfolio/', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  // Risk endpoints
  async getRiskAssessment(portfolioId: string) {
    return this.request(`/api/v1/risk/assessment/${portfolioId}`);
  }

  async getAlerts() {
    return this.request('/api/v1/risk/alerts');
  }

  // Simulation endpoints
  async runSimulation(simulationData: any) {
    return this.request('/api/v1/simulation/run', {
      method: 'POST',
      body: JSON.stringify(simulationData),
    });
  }

  async getSimulationHistory() {
    return this.request('/api/v1/simulation/history');
  }

  // News endpoints
  async getNews(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/api/v1/news/${params}`);
  }

  // Playbook endpoints
  async getPlaybooks() {
    return this.request('/api/v1/playbook/');
  }

  async getPlaybook(playbookId: string) {
    return this.request(`/api/v1/playbook/${playbookId}`);
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export functions for direct use
export const loginUser = (username: string, password: string) => apiClient.login(username, password);
export const registerUser = (email: string, username: string, password: string, full_name: string) => apiClient.register(email, username, password, full_name);
export const getCurrentUser = () => apiClient.getCurrentUser();
export const logoutUser = () => apiClient.clearToken();

// Export types for better TypeScript support
export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number?: string;
  risk_tolerance?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  total_value: number;
  currency: string;
  risk_score: number;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  created_at: string;
  is_read: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  url: string;
  published_at: string;
  impact_score: number;
  categories: string[];
}


