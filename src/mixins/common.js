import { hostUrl } from '@/server/apiConfig'

const CommonMixins = {
    computed: {
        $uploadUrl() {
            return `${hostUrl}/api/upFiles`
        },
        $uploadMp3Url() {
            return `${hostUrl}/api/upFilesMP3`
        }

    }
}


export default CommonMixins