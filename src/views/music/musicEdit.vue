<template>
    <section class="edit-wrap">
        <div class="main-header">
            <h3 class="title"> {{isEdit? $route.name: 'Music Add'}}</h3>
        </div>
        <el-form class="edit-mian" :model="editForm" :rules="editRules" ref="editForm" label-width="140px" label-position="left">
            <el-form-item label="Music Title" prop="musicTitle">
                <el-input v-model="editForm.musicTitle" placeholder="请输入Music Title"></el-input>
            </el-form-item>
            <el-form-item label="Music Author" prop="musicAuthor">
                <el-input v-model="editForm.musicAuthor" placeholder="请输入Music Author"></el-input>
            </el-form-item>
            <el-form-item label="Music Mp3" prop="musicUrl" style="width: 400px;">
                <el-upload
                  class="upload-demo"
                  :action="$uploadMp3Url"
                  :on-error="handleAvatarErrorMp3"
                  :on-success="handleAvatarSuccessMp3"
                  :before-upload="beforeAvatarUploadMp3"
                  :on-remove="fileListDelete"
                  :limit="1"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传Mp3文件，且不超过10Mb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="Music Lrc" prop="musicLrc">
                <el-input v-model="editForm.musicLrc" placeholder="请输入Music Lrc"></el-input>
            </el-form-item>
            <el-form-item label="Music Pic" prop="musicPic">
                 <el-upload
                    class="avatar-uploader"
                    :action="$uploadUrl"
                    nam="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.musicPic" :src="editForm.musicPic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="saveLoading" @click="submitForm('editForm')">立即创建</el-button>
                <el-button @click="resetForm('editForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import { AddApi, UpdateApi, FindByIdApi  } from '@/server/music'
  export default {
    data() {
      return {
        editForm: {
          musicTitle: '',
          musicAuthor: '',
          musicUrl: '',
          musicPic: '',
          musicLrc: ''
        },
        mp3Name: '',
        saveLoading: false,
        isEdit: false,
        fileList: [],
        _mid:null,
        editRules: {
          musicTitle: [
            { required: true, message: '请输入Music Title', trigger: 'blur' }
          ],
          musicAuthor: [
            { required: true, message: '请输入Music Author', trigger: 'blur' }
          ],
          musicUrl: [
            { required: true, message: '请上传MP3', trigger: 'blur' }
          ],
          musicPic: [
            { required: true, message: '请上传Music Pic', trigger: 'change' }
          ],
          musicLrc: [
            { required: true, message: '请填写Music 歌词地址 ', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save()
          } else {
            return false;
          } 
        });
      },
      resetForm(formName) {
        this.$confirm('点击确认将重置已填写数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs[formName].resetFields();
        }).catch(() => {
                   
        });
      },
      handleAvatarError(err, file, fileList) {
          console.log('---> err', err)
      },
      handleAvatarErrorMp3(err, file, fileList) {
          console.log('---> err', err)
      },
      handleAvatarSuccess(res, file) {
        if(res.code=== 200){
            this.editForm.musicPic = res.data.url
        }
      },
      handleAvatarSuccessMp3(res, file) {
        if(res.code=== 200){
            this.editForm.musicUrl = res.data.url
            this.fileList = [{
              url: res.data.url,
              name: this.mp3Name
            }]
        }
      },
      fileListDelete(file, fileList) {
        this.editForm.musicUrl = ''
      },
      beforeAvatarUploadMp3(file) {
        const isMp3 = file.type === 'audio/mp3';
        const isLt10M = file.size / 1024 / 1024 < 10;
        this.mp3Name = file.name
        if (!isMp3) {
          this.$message.error('上传音乐只能是 Mp3 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传的Mp3不能超过 10MB!');
        }
        return isMp3 && isLt10M;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save() {
        this.saveLoading = true
        if(this.isEdit) {
          UpdateApi(this.editForm).then(res => {
            this.saveLoading = false
            if(res.code == 200){
              this.$message({
                message: res.message,
                type: 'success'
              });
              this.$router.push('/music/list')
            }
          })
        }else {
          AddApi(this.editForm).then(res => {
            this.saveLoading = false
            if(res.code == 200){
              this.$message({
                message: res.message,
                type: 'success'
              });
              this.$router.push('/music/list')
            }
          })
        }
       
      },
      getDetail(id) {
        FindByIdApi({musicId: id}).then(res => {
          if(res.code == 200) {
            this.editForm = res.data
            this.fileList = [{
              name: `${res.data.musicTitle}.mp3`
            }]
          }
        })
      }
    },
    mounted() {
       let {_mid} = this.$route.query
        if(_mid){
            this.isEdit = true
            this._mid = _mid
            this.getDetail(_mid)
        }else{
            this.isEdit = false
        }
    }
  }
</script>
<style lang="scss">
.edit-wrap{
    .avatar-uploader{
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover{
                    border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 300px;
                height: 150px;
                line-height: 150px;
                text-align: center;
            }
            .avatar {
                width: 300px;
                height: 150px;
                display: block;
            }
        }
    }
}
@import '@/assets/style/banner/bannerEdit.scss';
</style>
