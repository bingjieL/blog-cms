<template>
    <section class="edit-wrap">
        <div class="main-header">
            <h3 class="title"> {{isEdit? $route.name: 'Blog Add'}}</h3>
        </div>
        <el-form class="edit-mian" :model="editForm" :rules="editRules" ref="editForm" label-width="140px" label-position="left">
            <el-form-item label="Blog Title" prop="blogTitle">
                <el-input v-model="editForm.blogTitle"></el-input>
            </el-form-item>
            <el-form-item label="Blog Author" prop="blogAuthor">
                <el-input v-model="editForm.blogAuthor"></el-input>
            </el-form-item>
            <el-form-item label="yin Url" prop="blogUrl">
                <el-input v-model="editForm.blogUrl"></el-input>
            </el-form-item>
            <el-form-item label="Blog Lrc" prop="blogLrc">
                <el-input v-model="editForm.blogLrc"></el-input>
            </el-form-item>
            <el-form-item label="Blog Pic" prop="blogPic">
                 <el-upload
                    class="avatar-uploader"
                    :action="$uploadUrl"
                    nam="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.blogPic" :src="editForm.blogPic" class="avatar">
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
import { AddApi, UpdateApi, FindByIdApi  } from '@/server/blog'
  export default {
    data() {
      return {
        editForm: {
          blogTitle: '',
          blogAuthor: '',
          blogUrl: '',
          blogPic: '',
          blogLrc: ''
        },
        saveLoading: false,
        isEdit: false,
        _mid:null,
        editRules: {
          blogTitle: [
            { required: true, message: '请输入Blog Title', trigger: 'blur' }
          ],
          blogAuthor: [
            { required: true, message: '请输入Blog Author', trigger: 'blur' }
          ],
          blogUrl: [
            { required: true, message: '请输入Blog Url', trigger: 'blur' }
          ],
          blogPic: [
            { required: true, message: '请上传Blog Pic', trigger: 'change' }
          ],
          blogLrc: [
            { required: true, message: '请填写Blog 歌词地址 ', trigger: 'blur' }
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
      handleAvatarSuccess(res, file) {
        if(res.code=== 200){
            this.editForm.blogPic = res.data.url
        }
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
              this.$router.push('/blog/list')
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
              this.$router.push('/blog/list')
            }
          })
        }
       
      },
      getDetail(id) {
        FindByIdApi({blogId: id}).then(res => {
          if(res.code == 200) {
            this.editForm = res.data
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
@import '@/assets/style/banner/bannerEdit.scss';
</style>
