class Bind {
  
  constructor(model, view, ...props) {
    let proxy = ProxyFactory.create(model, props, (model) => {
      view.update(model);
     
    });
    view.update(model);
    return proxy;
  }
}
  //...props - > O primeiro parâmetro será model, o segundo view e todos os outros serão props
