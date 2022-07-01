const H1: React.FC<any> = (props) => {
	return <h1 className="text-blue-500" {...props} />;
};

const Components: import("mdx/types").MDXComponents = {
	h1: H1,
};

export default Components;
