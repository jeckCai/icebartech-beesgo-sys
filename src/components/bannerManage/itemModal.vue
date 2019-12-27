 
<template>
  <div class="banner_modal">
    <el-dialog
      :visible.sync="visible"
      width="50%"
      :show-close="false"
      v-dialogDrag
      :close-on-click-modal="false"
    >
      <div slot="title" class="modal_title">
        <span class="ltext">{{title}}</span>
        <span class="rtext" @click="$emit('update:visible',false)">
          <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="content">
        <component :is="isComponent" @selectChange="selectChange"></component>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ActivityItem from "./components/activityItem";
import BrandItem from "./components/brandItem";
import CommodityItem from "./components/commodityItem";
import MarketItem from "./components/marketItem";
export default {
  name: "activityModal",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    title: {
      default: "选择活动",
      type: String
    },
    itemType: {
      default: 'STOP',
      type: String
    }
  },
  data() {
    return {
      
    };
  },
  computed: {
    isComponent() {
        
      let compoentName = "";
      switch (this.itemType) {
        case 'SHOP':
          compoentName = "MarketItem";
          break;
        case 'BRANCH':
          compoentName = "BrandItem";
          break;
        case 'GOODS':
          compoentName = "CommodityItem";
          break;
        case 'ACTIVITY':
          compoentName = "ActivityItem";
          break;
        default:
          break;
      }
      return compoentName
    }
  },
  methods: {
    selectChange(item) {
      // let {id,shopName} =item;
      this.$emit("onchange", item);
    }
  },
  components: {
    ActivityItem,
    BrandItem,
    CommodityItem,
    MarketItem
  }
};
</script>
<style lang="scss" scoped>
.banner_modal {
  /deep/ .el-dialog__header {
    background: #0189ff;
    .ltext {
      color: #fff;
      font-size: 18px;
    }
    .rtext {
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 20px;
    }
  }
}
</style>