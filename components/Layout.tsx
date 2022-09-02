import Header from "./Header";
import TabBar from "./TabBar";
import { ChainName } from "../utils";

interface ILayout {
	title: string;
	children: React.ReactNode;
	canGoBack?: boolean;
	hasTabBar?: boolean;
}

export default function Layout({
	title,
	children,
	canGoBack,
	hasTabBar,
}: ILayout) {
	return (
		<div className="container">
			<Header title={title} canGoBack={canGoBack} />
			<div
				className={ChainName(
					"pt-16 bg-slate-900 min-h-screen",
					hasTabBar ? "pb-20" : ""
				)}
			>
				{children}
			</div>
			{hasTabBar ? <TabBar /> : null}
		</div>
	);
}
