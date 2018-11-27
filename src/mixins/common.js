import { hostUrl } from '@/server/apiConfig'

const CommonMixins = {
    computed: {
        $uploadUrl() {
            return `${hostUrl}/api/upFiles`
        }
    }
}


export default CommonMixins