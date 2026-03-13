export interface NavItem {
    title: string;
    href: string;
    icon: string;
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}

export interface PieChartData {
    status: string;
    count: number;
}

export interface BarChartData {
    month: Date | string;
    count: number;
}

export interface IAdminDashboardData {
    appointmentCount: number;
    patientCount: number;
    doctorCount: number;
    adminCount: number;
    superAdminCount: number;
    paymentCount: number;
    userCount: number;
    totalRevenue: number;
    barChartData: BarChartData[];
    pieChartData: PieChartData[];
}

export interface IDoctorDashboardData {
    patientCount: number;
    appointmentCount: number;
    paymentCount: number;
    totalRevenue: number;
    barChartData: BarChartData[];
    pieChartData: PieChartData[];
}

export interface IPatientDashboardData {
    appointmentCount: number;
    paymentCount: number;
    totalRevenue: number;
    barChartData: BarChartData[];
    pieChartData: PieChartData[];
}
