const H1: React.FC<any> = (props) => {
	return (
		<h1
			className="text-3xl font-bold w-auto mt-0 -mb-1 leading-normal"
			{...props}
		/>
	);
};

const H2: React.FC<any> = (props) => {
	return <h2 className="text-2xl w-full mt-0 mb-2 leading-normal" {...props} />;
};

const H3: React.FC<any> = (props) => {
	return <h3 className="text-xl w-full mt-0 mb-2 leading-normal" {...props} />;
};

const H4: React.FC<any> = (props) => {
	return <h4 className="text-lg w-full mt-0 mb-2 leading-normal" {...props} />;
};

const H5: React.FC<any> = (props) => {
	return (
		<h5 className="text-base w-full mt-0 mb-2 leading-normal" {...props} />
	);
};

const H6: React.FC<any> = (props) => {
	return (
		<h6 className="text-base w-full mt-0 mb-2 leading-normal" {...props} />
	);
};

const P: React.FC<any> = (props) => {
	return (
		<p className="text-base w-full leading-relaxed mt-0 mb-4 " {...props} />
	);
};

const Blockquote: React.FC<any> = (props) => {
	return (
		<blockquote
			className="text-lg w-full leading-relaxed mt-6 mb-4 "
			{...props}
		/>
	);
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
};

export default Components;
