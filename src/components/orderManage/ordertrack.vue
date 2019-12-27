<template>
  <div class="ordertarck">
    <el-card>
      <div style="height: 150x;">
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div> 
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {

    }
  },
  methods:{
    getData(){
      axios.get('')
    }
  },
  created(){
    
  }
}
</script>
<style lang="scss" scoped>
  .ordertarck{

  }
</style>