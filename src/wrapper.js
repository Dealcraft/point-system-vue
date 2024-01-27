import { PTM } from "point-system";

export function install(Vue, options) {
	if (install.installed) return;

	let items = options.items;
	delete options.items;
	let ptm = new PTM(items, options);

	Vue.config.globalProperties.$ptmHasItem = itemIdentifier => {
		return ptm.hasItem(itemIdentifier);
	};

	Vue.config.globalProperties.$ptmBuyItem = itemIdentifier => {
		return ptm.buyItem(itemIdentifier);
	};

	Vue.config.globalProperties.$ptmGetItem = itemIdentifier => {
		return ptm.getItem(itemIdentifier);
	};

	Vue.config.globalProperties.$ptmChargeUser = amount => {
		return ptm.chargeUser(amount);
	};

	Vue.config.globalProperties.$ptmSellItem = itemIdentifier => {
		return ptm.sellItem(itemIdentifier);
	};

	Vue.config.globalProperties.$ptmBalance = ptm.balance;
	Vue.config.globalProperties.$ptmUserItems = ptm.userItems;

	Vue.config.globalProperties.$ptmItems = ptm.items;
	Vue.config.globalProperties.$ptmSetItems = items => {
		return (ptm.items = items);
	};

	Vue.config.globalProperties.$ptmUser = ptm.user;
	Vue.config.globalProperties.$ptmVERSION = ptm.VERSION;

	Vue.config.globalProperties.$ptmSetOptions = options => {
		return (ptm.options = options);
	};

	Vue.config.globalProperties.$ptmSetCallback = callback => {
		return (ptm.callback = callback);
	};

	install.installed = true;
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}
