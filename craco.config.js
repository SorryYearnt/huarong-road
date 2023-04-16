const { pluginByName, getPlugin } = require('@craco/craco');

module.exports = {
	webpack: {
		/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.externals = {
				react: 'React',
				'react-dom': 'ReactDOM',
				'react-redux': 'ReactRedux',
				'react-router-dom': 'ReactRouterDOM',
				'@reduxjs/toolkit': 'RTK'
			};

			webpackConfig.optimization.minimizer[0].options.minimizer.options.output.comments = (astNode, comment) => /SorryYearnt|版权声明/.test(comment.value) || (comment.type === "comment2" || comment.type === "comment1") && /@preserve|@lic|@cc_on|^\**!/i.test(comment.value);

			webpackConfig.optimization.minimizer[1].options.minimizer.options = {
				perset: ['default', {
					discardComments: {
						remove: comment => !/SorryYearnt|^!/.test(comment)
					}
				}]
			};

			{
				const userOptions = getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin')).match.userOptions;
				if (userOptions.minify) {
					userOptions.minify.removeComments = false;
				}
			}

			return webpackConfig;
		}
	}
};
