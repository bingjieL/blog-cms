<template>
    <section class="edit-wrap">
        <div class="main-header">
            <h3 class="title"> {{isEdit? $route.name: 'Blog Add'}}</h3>
        </div>
        <el-form class="edit-mian" :model="editForm" :rules="editRules" ref="editForm" label-width="140px" label-position="left">
            <el-form-item label="Blog Title" prop="blogTitle">
                <el-input v-model="editForm.blogTitle" placeholder="请输入Blog Title"></el-input>
            </el-form-item>
             <el-form-item label="Blog Type" prop="blog_type_id">
                  <el-select v-model="editForm.blog_type_id" placeholder="请选择文章类型">
                        <el-option
                            v-for="item in blogTypeData"
                            :key="item.value"
                            :label="item.blogTypeTitle"
                            :value="item.blogTypeId">
                        </el-option>
                    </el-select>
            </el-form-item>
             <el-form-item label="Blog Image" prop="blogImg">
                 <el-upload
                    class="avatar-uploader"
                    :action="$uploadUrl"
                    nam="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.blogImg" :src="editForm.blogImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="Blog Des" prop="blogDes">
                <el-input style="width: 80%;" type="textarea" :rows="3" v-model="editForm.blogDes" placeholder="请输入Blog Des"></el-input>
            </el-form-item>
            <el-form-item label="Blog Content" prop="blogContent">
                 <div class="quill">
                    <!-- <quill-editor 
                        v-model="editForm.blogContent" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor> -->
                     <WangEdit :catchData="catchData" :defaultContent="defaultContent"></WangEdit>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="saveLoading" @click="submitForm('editForm')">立即创建</el-button>
                <el-button @click="resetForm('editForm')">取消</el-button>
            </el-form-item>
        </el-form>
       
    </section>
</template>
<script>
import {GetBlogTypeApi, AddApi, UpdateApi, FindByIdApi  } from '@/server/blog'
import WangEdit from '../../commponents/wangedit'
// catchData
  export default {
    components: {
        WangEdit
    },
    data() {
      return {
        editForm: {
            blogTitle: '',
            blogDes: '',
            blogContent: '',
            blog_type_id: '',
            blogImg: ''
        },
        defaultContent: '',
        saveLoading: false,
        isEdit: false,
        _mid:null,
        editRules: {
          blogTitle: [
            { required: true, message: '请输入Blog Title', trigger: 'blur' }
          ],
          blogDes: [
            { required: true, message: '请输入Blog Des', trigger: 'blur' }
          ],
          blogImg: [
            { required: true, message: '请上传Blog Image', trigger: 'blur' }
          ],
          blogContent: [
            { required: true, message: '请输入Blog Content', trigger: 'blur' }
          ],
          blog_type_id: [
            { required: true, message: '请选择Blog Type', trigger: 'change' }
          ]
        },
        editorOption:{
            placeholder: '请输入blog内容',
            theme: 'snow'
        },
        blogTypeData:[]
      };
    },
    methods: {
        catchData(html) {
            // console.log('----> html', html)
            this.editForm.blogContent = html
        },
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(val){
            
            // val.replace(/\s/g,'')
        }, // 内容改变事件
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },

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
                }).catch(err => {
                    this.saveLoading = false
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
                }).catch(err => {
                    this.saveLoading = false
                })
            }
        
        },
        handleAvatarError(err, file, fileList) {
            console.log('---> err', err)
        },
        handleAvatarSuccess(res, file) {
            if(res.code=== 200){
                this.editForm.blogImg = res.data.url
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
        getBlogType() {
            GetBlogTypeApi().then(res => {
                if(res.code == 200){
                    this.blogTypeData = res.data.rows
                }
            })
        },
        getDetail(id) {
            FindByIdApi({blogId: id}).then(res => {
                if(res.code == 200) {
                    this.editForm = res.data
                    this.defaultContent = this.editForm.blogContent
                }
            })
        }
    },
    mounted() {
        this.getBlogType()
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
.ql-editor {
    white-space: normal!important;
}
.edit-wrap{
    .quill{
        width: 80%;
        
        margin-bottom: 40px;  
        .quill-editor{
            .ql-editor{
                min-height: 500px;
            }   
        }
        .w-e-text-container{
             height: 400px!important;
             .w-e-text{
                 overflow-y:auto;
             }
        }
    }
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
