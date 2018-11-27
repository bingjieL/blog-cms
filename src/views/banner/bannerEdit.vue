<template>
    <section class="edit-wrap">
        <div class="main-header">
            <h3 class="title"> {{$route.name}}</h3>
        </div>
        <el-form class="edit-mian" :model="editForm" :rules="editRules" ref="editForm" label-width="140px" label-position="left">
            <el-form-item label="Banner Title" prop="bannerTitle">
                <el-input v-model="editForm.bannerTitle"></el-input>
            </el-form-item>
            <el-form-item label="Banner Image" prop="bannerImg">
                 <el-upload
                    class="avatar-uploader"
                    :action="$uploadUrl"
                    nam="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.bannerImg" :src="editForm.bannerImg" class="avatar">
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
import { AddApi, UpdateApi, FindByIdApi  } from '@/server/banner'
  export default {
    data() {
      return {
        editForm: {
          bannerTitle: '',
          bannerImg: ''
        },
        saveLoading: false,
        isEdit: false,
        _bid:null,
        editRules: {
          bannerTitle: [
            { required: true, message: '请输入Banner Title', trigger: 'blur' }
          ],
          bannerImg: [
            { required: true, message: '请上传Banner Image', trigger: 'change' }
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
            this.editForm.bannerImg = res.data.url
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
              this.$router.push('/banner/list')
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
              this.$router.push('/banner/list')
            }
          })
        }
       
      },
      getDetail(id) {
        FindByIdApi({bannerId: id}).then(res => {
          if(res.code == 200) {
            this.editForm = res.data
          }
        })
      }
    },
    mounted() {
       let {_bid} = this.$route.query
        if(_bid){
            this.isEdit = true
            this._bid = _bid
            this.getDetail(_bid)
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
