<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    // console.log(icon, title);

    //如果有图标
    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        // vnodes.push(<svg-icon icon-class={icon} />);
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
        // console.log("格式好的图标", vnodes);
      }
    }
    // 如果有标题
    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
