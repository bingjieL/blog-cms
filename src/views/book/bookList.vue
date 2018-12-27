<template>
    <section class="add-wrap">
         <div class="main-header">
            <h3 class="title"> {{$route.name}}</h3>
            <el-button type="primary" @click='goAdd'>添加</el-button>
        </div>
        <el-table
            :data="bookListData"
            stripe
            :default-sort = "{prop: 'bookId', order: 'descending'}"
            style="width: 100%">
            <el-table-column
            prop="updatedTime"
            label="Date"
            sortable
            width="140">
                <template slot-scope="scope">
                    <span>{{scope.row.updated_time.substring(0, 10)}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="bookId"
            label="bookId"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="bookTitle"
            label="bookTitle"
            sortable>
            </el-table-column>
            <el-table-column
            prop="bookAuthor"
            label="bookAuthor"
            sortable>
            </el-table-column>
            <el-table-column
            prop="bookpdfUrl"
            label="bookpdfUrl"
            sortable>
            </el-table-column>
             <el-table-column
            prop="bookdlUrl"
            label="bookdlUrl"
            sortable>
            </el-table-column>
            <el-table-column
            prop="bookPic"
            label="图片地址">
                <template slot-scope="scope">
                    <a style="color: #2593FC;" :href="scope.row.bookPic" target="_blank" rel="noopener noreferrer">{{scope.row.bookPic}}</a>
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                   <i class="el-icon-edit action" @click="goEdit(scope.row)"></i>
                   <i class="el-icon-delete action" @click="deleteBaner(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
import { GetApi, DeleteApi } from '@/server/book'
export default {
    data () {
        return {
            bookListData: [],
            count: 0,
            pageSize: 0,
        }   
    },
    methods: {
        goAdd(){
            this.$router.push('/book/edit')
        },
        goEdit(rowDetail) {
          let _id =   rowDetail.bookId
          this.$router.push({path: '/book/edit', query:{_mid: _id}})
        },
        getList(params) {
            GetApi(params).then(res => {
                if(res.code == 200) {
                    this.bookListData = res.data.rows
                    this.count = res.data.count
                }
            })
        },
        deleteBaner(rowDetail) {
            let _id =   rowDetail.bookId
            let params = {
                bookId: _id
            }
            this.$confirm('点击确认将删除此条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
               DeleteApi(params).then(res => {
                   if(res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.getList({})
                   }
               })
            }).catch(() => {
                    
            });
        }
    },
    mounted() {
        this.getList({})
    }
}
</script>

<style lang='scss'>
    .add-wrap{
        .action{
            font-size: 18px;
            padding: 0 5px;
            cursor: pointer;
        }
        .el-icon-delete{
            color: #f56c6c;
        }
    }
</style>
