// Reads the exported function's actual props, including aliases/defaults and forwarded-ref functions.
const babel = require('@babel/standalone');
module.exports = function sourceProps(source, name) {
  let result = null;
  babel.transform(source, { ast: false, code: false, parserOpts: {sourceType:'module',plugins:['jsx']}, plugins: [() => ({visitor:{VariableDeclarator(path) {
    const node=path.node;
    if(!result && path.scope.path.isProgram() && node.id.name===name && node.init?.type==='ObjectExpression') result={props:{},jsx:false,namespace:node.init.properties.filter(p=>p.type==='ObjectProperty'&&!p.computed).map(p=>({key:p.key.name||p.key.value,name:p.value.name}))};
  },Function(path) {
    let owner = path.node.id && path.node.id.name;
    if (path.parentPath.isVariableDeclarator()) owner = path.parentPath.node.id.name;
    if (path.parentPath.isCallExpression() && path.parentPath.parentPath.isVariableDeclarator()) owner = path.parentPath.parentPath.node.id.name;
    if (owner !== name || result) return;
    result = { props: {}, jsx: false };
    const parameter = path.node.params[0], first = parameter && parameter.type === 'AssignmentPattern' ? parameter.left : parameter;
    const add = item => {
      if (item.type !== 'ObjectProperty' || item.computed) return;
      const key = item.key.name || item.key.value, value = item.value;
      result.props[key] = { local: value.type === 'AssignmentPattern' ? value.left.name : value.name,
        default: value.type === 'AssignmentPattern' ? source.slice(value.right.start,value.right.end) : undefined };
    };
    if (first && first.type === 'ObjectPattern') first.properties.forEach(add);
    const binding = first && first.type === 'Identifier' && path.scope.getBinding(first.name);
    path.traverse({ JSXElement(){result.jsx=true;}, JSXFragment(){result.jsx=true;},
      MemberExpression(member) {
        const node=member.node;
        if (!binding || node.object.type!=='Identifier' || node.object.name!==first.name || member.scope.getBinding(first.name)!==binding) return;
        const key=node.computed ? node.property.type==='StringLiteral' && node.property.value : node.property.name;
        if (key) result.props[key] = result.props[key] || {local:key};
      },
      VariableDeclarator(variable) {
        const {id,init}=variable.node;
        if(binding && id.type==='ObjectPattern' && init && init.type==='Identifier' && init.name===first.name && variable.scope.getBinding(first.name)===binding) id.properties.forEach(add);
      }
    });
  }}})] });
  return result;
};
