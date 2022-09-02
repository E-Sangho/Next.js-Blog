const H1: React.FC<any> = (props) => {
	return (
		<h1
			className="text-3xl text-gray-300 font-bold w-auto mt-0 mb-2 leading-normal border-b-2 border-gray-100"
			{...props}
		/>
	);
};

const H2: React.FC<any> = (props) => {
	return (
		<h2
			className="text-2xl text-gray-300 w-full mt-4 mb-4 pb-1 leading-normal border-b-2 border-gray-500"
			{...props}
		/>
	);
};

const H3: React.FC<any> = (props) => {
	return (
		<h3
			className="text-xl text-gray-300 w-full mt-4 mb-4 pb-1 leading-normal border-b-2 border-gray-500"
			{...props}
		/>
	);
};

const H4: React.FC<any> = (props) => {
	return (
		<h4
			className="text-lg text-gray-300 w-full mt-4 mb-4 pb-1 leading-normal border-b-2 border-gray-500"
			{...props}
		/>
	);
};

const H5: React.FC<any> = (props) => {
	return (
		<h5
			className="text-base text-gray-300 w-full mt-4 mb-4 pb-1 leading-normal border-b-2 border-gray-500"
			{...props}
		/>
	);
};

const H6: React.FC<any> = (props) => {
	return (
		<h6
			className="text-base text-gray-300 w-full mt-4 mb-4 pb-1 leading-normal border-b-2 border-gray-500"
			{...props}
		/>
	);
};

const P: React.FC<any> = (props) => {
	return (
		<p
			className="text-sm text-gray-300 w-full leading-6 mt-4 mb-4 "
			{...props}
		/>
	);
};

const Blockquote: React.FC<any> = (props) => {
	return (
		<blockquote
			className="text-lg w-full leading-relaxed mt-6 mb-4"
			{...props}
		/>
	);
};

const A: React.FC<any> = (props) => {
	return <a className="text-blue-500 w-full leading-6" {...props} />;
};
const Components: import("mdx/types").MDXComponents = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	h6: H6,
	p: P,
	blockquote: Blockquote,
	a: A,
};

export default Components;
