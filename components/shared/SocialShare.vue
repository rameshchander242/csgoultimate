<template>
  <social-sharing url="{url}"
                      title="{title}"
                      description="{description}"
                      quote="{quote}"
                      hashtags="{hashtags}"
                      twitter-user="twitter_user"
                        v-cloak inline-template>
    <div>
      <network network="facebook">
        <i class="fa fa-fw fa-facebook"></i>
      </network>
      <network network="googleplus">
        <i class="fa fa-fw fa-google-plus"></i>
      </network>
      <network network="linkedin">
        <i class="fa fa-fw fa-linkedin"></i>
      </network>
      <network network="pinterest">
        <i class="fa fa-fw fa-pinterest"></i>
      </network>
      <network network="reddit">
        <i class="fa fa-fw fa-reddit"></i>
      </network>
      <network network="twitter">
        <i class="fa fa-fw fa-twitter"></i>
      </network>
      <network network="vk">
        <i class="fa fa-vk"></i>
      </network>
      <network network="weibo">
        <i class="fa fa-weibo"></i>
      </network>
      <network network="whatsapp">
        <i class="fa fa-fw fa-whatsapp"></i> Whatsapp
      </network>
    </div>
  </social-sharing>
</template>
<script>
export default{
  name: 'SocialShare',
  props: {
    player_details: Object,
    detail_loader: {
      url: String,
      title: String,
      description: String,
      quote: String,
      hashtags: String,
      twitter_user: String
    },
  },
}
</script>