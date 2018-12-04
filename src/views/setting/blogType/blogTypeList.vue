<template>
    <section class="add-wrap">
         <div class="main-header">
            <h3 class="title"> {{$route.name}}</h3>
            <el-button type="primary" @click='goAdd'>添加</el-button>
        </div>
        <el-table
            :data="blogTypeListData"
            stripe
            :default-sort = "{prop: 'blogTypeId', order: 'descending'}"
            style="width: 100%">
            <el-table-column
            prop="updatedTime"
            label="Date"
            sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.updated_time.substring(0, 10)}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="blogTypeId"
            label="blogTypeId"
            sortable>
            </el-table-column>
            <el-table-column
            prop="blogTypeTitle"
            label="blogTypeTitle"
            sortable>
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
import { GetApi, DeleteApi } from '@/server/blogType'
export default {
    data () {
        return {
            blogTypeListData: [],
            count: 0,
        }   
    },
    methods: {
        goAdd(){
            this.$router.push('/setting/blogTypeEdit')
        },
        goEdit(rowDetail) {
          let _id =   rowDetail.blogTypeId
          this.$router.push({path: '/setting/blogTypeEdit', query:{_bid: _id}})
        },
        getList(params) {
            GetApi(params).then(res => {
                if(res.code == 200) {
                    this.blogTypeListData = res.data.rows
                    this.count = res.data.count
                }
            })
        },
        deleteBaner(rowDetail) {
            let _id =   rowDetail.blogTypeId
            let params = {
                blogTypeId: _id
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
