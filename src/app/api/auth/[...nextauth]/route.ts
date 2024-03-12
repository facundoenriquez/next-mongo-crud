import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/utils/mongoose';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // El nombre que se mostrará en el formulario de inicio de sesión (por ejemplo, "Iniciar sesión con...")
            name: 'Credentials',
            // `credentials` se utiliza para generar un formulario en la página de inicio de sesión.
            // Puede especificar qué campos deben enviarse agregando claves al objeto `credentials`.
            // p.ej. dominio, nombre de usuario, contraseña, token 2FA, etc.
            // Puedes pasar cualquier atributo HTML a la etiqueta <input> a través del objeto.
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: '' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '*****',
                },
            },
            async authorize(credentials, req) {
                // Agregue lógica aquí para buscar el usuario a partir de las credenciales proporcionadas.
                connectDB();
                console.log(credentials);
                const userFound = await User.findOne({
                    email: credentials?.email,
                }).select('+password');
                if (!userFound) throw new Error('Invalid credentials');
                console.log(userFound);
                const passwordMatch = await bcrypt.compare(
                    credentials?.password,
                    userFound.password
                );

                if (!passwordMatch) throw new Error('Invalid credentials');
                console.log(userFound);
                return userFound;

                // if (userFound) {
                //     Cualquier objeto devuelto se guardará en la propiedad `usuario` del JWT
                //     console.log(userFound);
                //     return userFound;
                // } else {
                //     Si devuelve nulo, se mostrará un error advirtiendo al usuario que verifique sus detalles.
                //     return null;
                //     También puedes rechazar esta devolución de llamada con un error, por lo que el usuario será enviado a la página de error con el mensaje de error como parámetro de consulta.
                // }
            },
        }),
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;
            return token;
        },
        session({ session, token }) {
            session.user = token.user;
            console.log(session, token);
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
});

export { handler as GET, handler as POST };
