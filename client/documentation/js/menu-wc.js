'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mobillio-online-store documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4bca114410f6811bfb6eb1fab9f42e4bde000d18e61a21b78c493a2b9d13799e4ee590eeb73b87e554cf8fa7654dd0bd6ffabd6cbd9659dcab20fc61ff9deba4"' : 'data-target="#xs-components-links-module-AppModule-4bca114410f6811bfb6eb1fab9f42e4bde000d18e61a21b78c493a2b9d13799e4ee590eeb73b87e554cf8fa7654dd0bd6ffabd6cbd9659dcab20fc61ff9deba4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4bca114410f6811bfb6eb1fab9f42e4bde000d18e61a21b78c493a2b9d13799e4ee590eeb73b87e554cf8fa7654dd0bd6ffabd6cbd9659dcab20fc61ff9deba4"' :
                                            'id="xs-components-links-module-AppModule-4bca114410f6811bfb6eb1fab9f42e4bde000d18e61a21b78c493a2b9d13799e4ee590eeb73b87e554cf8fa7654dd0bd6ffabd6cbd9659dcab20fc61ff9deba4"' }>
                                            <li class="link">
                                                <a href="components/AddProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SellerDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SellerDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BasketModule.html" data-type="entity-link" >BasketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BasketModule-38dd512e8570e7789644eb3947c63bd8060eada943bba7241579e49c7e248bb08c21727d4a23c769b28e041aee64d34a08b69c0b7e1dd6c5a4a39349e9fa80ec"' : 'data-target="#xs-components-links-module-BasketModule-38dd512e8570e7789644eb3947c63bd8060eada943bba7241579e49c7e248bb08c21727d4a23c769b28e041aee64d34a08b69c0b7e1dd6c5a4a39349e9fa80ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BasketModule-38dd512e8570e7789644eb3947c63bd8060eada943bba7241579e49c7e248bb08c21727d4a23c769b28e041aee64d34a08b69c0b7e1dd6c5a4a39349e9fa80ec"' :
                                            'id="xs-components-links-module-BasketModule-38dd512e8570e7789644eb3947c63bd8060eada943bba7241579e49c7e248bb08c21727d4a23c769b28e041aee64d34a08b69c0b7e1dd6c5a4a39349e9fa80ec"' }>
                                            <li class="link">
                                                <a href="components/basket.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >basket</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-ed6f2522ddafa4a30a376982f44e809b8acc32d50e2be7b26c70123b8de83f05dd3746e0fe71acc5e8593568f013447bb3c12ae62e495ed8065742c7daf9b239"' : 'data-target="#xs-components-links-module-ComponentsModule-ed6f2522ddafa4a30a376982f44e809b8acc32d50e2be7b26c70123b8de83f05dd3746e0fe71acc5e8593568f013447bb3c12ae62e495ed8065742c7daf9b239"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-ed6f2522ddafa4a30a376982f44e809b8acc32d50e2be7b26c70123b8de83f05dd3746e0fe71acc5e8593568f013447bb3c12ae62e495ed8065742c7daf9b239"' :
                                            'id="xs-components-links-module-ComponentsModule-ed6f2522ddafa4a30a376982f44e809b8acc32d50e2be7b26c70123b8de83f05dd3746e0fe71acc5e8593568f013447bb3c12ae62e495ed8065742c7daf9b239"' }>
                                            <li class="link">
                                                <a href="components/BlogPostCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogPostCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Cart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Cart</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectionHeading.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SectionHeading</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/commentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >commentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-15fcaff38cf72a40186099e95ee5f37e91c41b5105d26fbdaa79287446eec2918d38cf97631c728754318a6b8473b6c0d865b08fe1e70c3e8f6b329d4d35f39b"' : 'data-target="#xs-components-links-module-HomeModule-15fcaff38cf72a40186099e95ee5f37e91c41b5105d26fbdaa79287446eec2918d38cf97631c728754318a6b8473b6c0d865b08fe1e70c3e8f6b329d4d35f39b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-15fcaff38cf72a40186099e95ee5f37e91c41b5105d26fbdaa79287446eec2918d38cf97631c728754318a6b8473b6c0d865b08fe1e70c3e8f6b329d4d35f39b"' :
                                            'id="xs-components-links-module-HomeModule-15fcaff38cf72a40186099e95ee5f37e91c41b5105d26fbdaa79287446eec2918d38cf97631c728754318a6b8473b6c0d865b08fe1e70c3e8f6b329d4d35f39b"' }>
                                            <li class="link">
                                                <a href="components/Home.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Home</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginUserModule.html" data-type="entity-link" >LoginUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginUserModule-8933d389f6cd78fcbac05721ddbdb1e77ac88f2a3ac1ba12eaf51e86bad94093ae6e531672496bac624b8f78231acfc3f32c4654f6f428a4e71daa5591348e53"' : 'data-target="#xs-components-links-module-LoginUserModule-8933d389f6cd78fcbac05721ddbdb1e77ac88f2a3ac1ba12eaf51e86bad94093ae6e531672496bac624b8f78231acfc3f32c4654f6f428a4e71daa5591348e53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginUserModule-8933d389f6cd78fcbac05721ddbdb1e77ac88f2a3ac1ba12eaf51e86bad94093ae6e531672496bac624b8f78231acfc3f32c4654f6f428a4e71daa5591348e53"' :
                                            'id="xs-components-links-module-LoginUserModule-8933d389f6cd78fcbac05721ddbdb1e77ac88f2a3ac1ba12eaf51e86bad94093ae6e531672496bac624b8f78231acfc3f32c4654f6f428a4e71daa5591348e53"' }>
                                            <li class="link">
                                                <a href="components/loginuser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >loginuser</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrdersModule-6a530ec4ecc38b296cc2749a6d94473f9f5f6911ae07b71a4a8e8fdc958491389b01d70f23506d27207d6f961c5a5758cc3f5c44009bf1ce8ca3f6c185756e69"' : 'data-target="#xs-components-links-module-OrdersModule-6a530ec4ecc38b296cc2749a6d94473f9f5f6911ae07b71a4a8e8fdc958491389b01d70f23506d27207d6f961c5a5758cc3f5c44009bf1ce8ca3f6c185756e69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrdersModule-6a530ec4ecc38b296cc2749a6d94473f9f5f6911ae07b71a4a8e8fdc958491389b01d70f23506d27207d6f961c5a5758cc3f5c44009bf1ce8ca3f6c185756e69"' :
                                            'id="xs-components-links-module-OrdersModule-6a530ec4ecc38b296cc2749a6d94473f9f5f6911ae07b71a4a8e8fdc958491389b01d70f23506d27207d6f961c5a5758cc3f5c44009bf1ce8ca3f6c185756e69"' }>
                                            <li class="link">
                                                <a href="components/Orders.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Orders</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PayModule.html" data-type="entity-link" >PayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PayModule-497c058b3b657c9b41f8fa6119fda7add5b3eb9cddb6eea7d486dbc164ff2b013e30d1cbb43046b8dbb00836416d79b4db26a35286ae110abf99d184d17e7123"' : 'data-target="#xs-components-links-module-PayModule-497c058b3b657c9b41f8fa6119fda7add5b3eb9cddb6eea7d486dbc164ff2b013e30d1cbb43046b8dbb00836416d79b4db26a35286ae110abf99d184d17e7123"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PayModule-497c058b3b657c9b41f8fa6119fda7add5b3eb9cddb6eea7d486dbc164ff2b013e30d1cbb43046b8dbb00836416d79b4db26a35286ae110abf99d184d17e7123"' :
                                            'id="xs-components-links-module-PayModule-497c058b3b657c9b41f8fa6119fda7add5b3eb9cddb6eea7d486dbc164ff2b013e30d1cbb43046b8dbb00836416d79b4db26a35286ae110abf99d184d17e7123"' }>
                                            <li class="link">
                                                <a href="components/pay.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >pay</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductModule-9d98732fa32ae8fa4ec29e317b9621f6335e09df8fdd9712f0f3e84732cb1361cad04b44db5b7becb7a96cc3a5ddfff59f4365de3094821933ca96588b558900"' : 'data-target="#xs-components-links-module-ProductModule-9d98732fa32ae8fa4ec29e317b9621f6335e09df8fdd9712f0f3e84732cb1361cad04b44db5b7becb7a96cc3a5ddfff59f4365de3094821933ca96588b558900"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductModule-9d98732fa32ae8fa4ec29e317b9621f6335e09df8fdd9712f0f3e84732cb1361cad04b44db5b7becb7a96cc3a5ddfff59f4365de3094821933ca96588b558900"' :
                                            'id="xs-components-links-module-ProductModule-9d98732fa32ae8fa4ec29e317b9621f6335e09df8fdd9712f0f3e84732cb1361cad04b44db5b7becb7a96cc3a5ddfff59f4365de3094821933ca96588b558900"' }>
                                            <li class="link">
                                                <a href="components/product.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >product</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductsModule-7cccd977283334e314c2ccc91a8470a94e39c1988bb9e720b570ba782e2ceb88e878dd9d045d5ca957e92bbe0121213bf398e3d844179c17a8b395bb77a846b9"' : 'data-target="#xs-components-links-module-ProductsModule-7cccd977283334e314c2ccc91a8470a94e39c1988bb9e720b570ba782e2ceb88e878dd9d045d5ca957e92bbe0121213bf398e3d844179c17a8b395bb77a846b9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductsModule-7cccd977283334e314c2ccc91a8470a94e39c1988bb9e720b570ba782e2ceb88e878dd9d045d5ca957e92bbe0121213bf398e3d844179c17a8b395bb77a846b9"' :
                                            'id="xs-components-links-module-ProductsModule-7cccd977283334e314c2ccc91a8470a94e39c1988bb9e720b570ba782e2ceb88e878dd9d045d5ca957e92bbe0121213bf398e3d844179c17a8b395bb77a846b9"' }>
                                            <li class="link">
                                                <a href="components/products.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >products</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link" >RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterModule-bb469b02b231673041cbf3e0d4960e60a8dcac15b3d38bf41163afedc16cd3468288eedbb65c2c2c504e59b9c7fa48297eb0e740457e4e6b7e3329f2d7f92975"' : 'data-target="#xs-components-links-module-RegisterModule-bb469b02b231673041cbf3e0d4960e60a8dcac15b3d38bf41163afedc16cd3468288eedbb65c2c2c504e59b9c7fa48297eb0e740457e4e6b7e3329f2d7f92975"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterModule-bb469b02b231673041cbf3e0d4960e60a8dcac15b3d38bf41163afedc16cd3468288eedbb65c2c2c504e59b9c7fa48297eb0e740457e4e6b7e3329f2d7f92975"' :
                                            'id="xs-components-links-module-RegisterModule-bb469b02b231673041cbf3e0d4960e60a8dcac15b3d38bf41163afedc16cd3468288eedbb65c2c2c504e59b9c7fa48297eb0e740457e4e6b7e3329f2d7f92975"' }>
                                            <li class="link">
                                                <a href="components/register.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >register</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SellerDashboardModule.html" data-type="entity-link" >SellerDashboardModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link" >ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorComponent.html" data-type="entity-link" >ErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent-1.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService-1.html" data-type="entity-link" >ProductService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AutoCompleteModel.html" data-type="entity-link" >AutoCompleteModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/product.html" data-type="entity-link" >product</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});