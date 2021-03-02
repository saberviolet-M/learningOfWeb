<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button plain size="mini" type="danger">编辑</van-button>
      </van-cell>
      <van-grid>
        <van-grid>
          <van-grid-item
            :class="{ current: index === active }"
            @click="clickMychannel(item)"
            v-for="(item, index) in channels"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
            <!-- <van-icon name="cross" class="btn"></van-icon> -->
          </van-grid-item>
        </van-grid>
      </van-grid>
    </div>
    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span>{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChannelEdit',
  props: {
    active: {
      type: Number, // 必须是Number类型
      required: false, // 是否是必填项
      default: 0 // 默认值
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('channels', ['getAllChannelsAsync']),
    clickMychannel(item) {
      this.$emit('update-curchannel', item)
    }
  },
  computed: {
    ...mapState('channels', ['channels']),
    ...mapGetters('channels', ['optionalChannels'])
  },
  created() {
    this.getAllChannelsAsync()
  }
}
</script>

<style lang="scss" scoped>
.channel {
  padding: 15px;
  font-size: 14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
}
.current {
  color: #e5615b;
  font-weight: bold;
}
</style>
