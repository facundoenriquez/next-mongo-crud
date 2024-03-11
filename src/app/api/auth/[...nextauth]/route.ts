import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
                const user = {
                    id: '1',
                    name: 'J Smith',
                    email: 'jsmith@example.com',
                };

                if (user) {
                    // Cualquier objeto devuelto se guardará en la propiedad `usuario` del JWT
                    console.log(user);
                    return user;
                } else {
                    // Si devuelve nulo, se mostrará un error advirtiendo al usuario que verifique sus detalles.
                    return null;
                    // También puedes rechazar esta devolución de llamada con un error, por lo que el usuario será enviado a la página de error con el mensaje de error como parámetro de consulta.
                }
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
});

export { handler as GET, handler as POST };
