//按需加载所要的vant组件
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { Swipe, SwipeItem,Divider } from 'vant';
import { Tab, Tabs } from 'vant';
import { ImagePreview } from 'vant';
import { Sku } from 'vant';
import { Stepper } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { AddressList } from 'vant';
import { Area } from 'vant';
import { AddressEdit } from 'vant';
import { Popup } from 'vant';
import { NumberKeyboard } from 'vant';
import { ActionSheet } from 'vant';
import { NoticeBar } from 'vant';
import { Notify } from 'vant';
import { Uploader } from 'vant';
import { PullRefresh } from 'vant';
import { Picker } from 'vant';
import { Field } from 'vant';
import { Search } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { SwipeCell } from 'vant';
import { Card } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Card);
Vue.use(SwipeCell);
Vue.use(Sidebar);
Vue.use(SidebarItem)
Vue.use(Search);
Vue.use(Field);
Vue.use(Picker);
Vue.use(PullRefresh);
Vue.use(Uploader);
Vue.use(Notify);
Vue.use(NoticeBar)
Vue.use(ActionSheet);
Vue.use(NumberKeyboard);
Vue.use(Popup);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(AddressList);
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Stepper);
Vue.use(Sku);
Vue.use(ImagePreview);
Vue.use(Tab).use(Tabs);

Vue.use(Divider);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tabbar).use(TabbarItem);