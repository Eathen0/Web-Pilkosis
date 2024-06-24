import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Upload file using standard upload
async function uploadFile(file, filename) {
    const { data, error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).upload(filename, file, {
        contentType: 'image/png'
    })
    if (error) {
        return error

    } else {
        const result = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(data.path)
        return result.data.publicUrl

    }

    // return "dummy url"
}


export default uploadFile