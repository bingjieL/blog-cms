<template>
    <section class="edit-wrap">
        <div class="main-header">
            <h3 class="title"> {{isEdit? $route.name: 'MusicSheet Add'}}</h3>
        </div>
        <el-form class="edit-mian" :model="editForm" :rules="editRules" ref="editForm" label-width="140px" label-position="left">
            <el-form-item label="MusicSheet Title" prop="sheetTitle">
                <el-input v-model="editForm.sheetTitle" placeholder="请输入MusicSheet Title"></el-input>
            </el-form-item>
             <el-form-item label="MusicSheet Tag" prop="sheetTag">
                <el-input v-model="editForm.sheetTag" placeholder="请输入MusicSheet Tag"></el-input>
            </el-form-item>
            <el-form-item label="MusicSheet Url" prop="sheetUrl">
                <el-input v-model="editForm.sheetUrl"  placeholder="请输入MusicSheet Url"></el-input>
            </el-form-item>
           
           
            <el-form-item label="MusicSheet Logo" prop="sheetImg">
                 <el-upload
                    class="avatar-uploader"
                    :action="$uploadUrl"
                    nam="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.sheetImg" :src="editForm.sheetImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="MusicSheet Des" prop="sheetDes">
                <el-input style="width: 50%;" maxlength="24" type="textarea" :rows="3" v-model="editForm.sheetDes" placeholder="请输入MusicSheet Des"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="saveLoading" @click="submitForm('editForm')">立即创建</el-button>
                <el-button @click="resetForm('editForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import { AddApi, UpdateApi, FindByIdApi  } from '@/server/musicSheet'
  export default {
    data() {
      return {
        editForm: {
          sheetTitle: '',
          sheetUrl: '',
          sheetTag: '',
          sheetImg: '',
          sheetDes: ''
        },
        saveLoading: false,
        isEdit: false,
        _mid:null,
        editRules: {
          sheetTitle: [
            { required: true, message: '请输入MusicSheet Title', trigger: 'blur' }
          ],
          sheetUrl: [
            { required: true, message: '请输入MusicSheet Url', trigger: 'blur' }
          ],
          sheetTag: [
            { required: true, message: '请填写MusicSheet Tag', trigger: 'blur' }
          ],
          sheetImg: [
            { required: true, message: '请上传MusicSheet Logo ', trigger: 'change' }
          ],
          sheetTag: [
            { required: true, message: '请填写MusicSheet Des', trigger: 'blur' }
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
            this.editForm.sheetImg = res.data.url
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
              this.$router.push('/musicSheet/list')
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
              this.$router.push('/musicSheet/list')
            }
          })
        }
       
      },
      getDetail(id) {
        FindByIdApi({sheetId: id}).then(res => {
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
