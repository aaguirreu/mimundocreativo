import supabase from '../../client'

export default async function login (email, password) {
    try {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password,
          })
    } catch (error) {
        
    }

}