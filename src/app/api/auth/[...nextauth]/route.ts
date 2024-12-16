import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Ajusta la ruta según tu estructura de carpetas

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
