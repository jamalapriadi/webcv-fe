<template>
    <div class="container-fluid">
        <h1 class="my-5">Heros</h1>
        <hr>
        <div class="px-4 py-5 my-5 text-center bg-white">
            <img class="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
            <h1 class="display-5 fw-bold">Centered hero</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="px-4 pt-5 my-5 text-center border-bottom bg-white">
            <h1 class="display-4 fw-bold">Centered screenshot</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                </div>
            </div>
            <div class="overflow-hidden" style="max-height: 30vh;">
                <div class="container px-5">
                    <img src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-docs.png" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="container col-xxl-8 px-4 py-5 bg-white">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
                    <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="container my-5">
            <div class="row bg-white p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h1 class="display-4 fw-bold lh-1">Border hero with cropped image and shadows</h1>
                    <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Primary</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                    <img class="rounded-lg-3" src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-docs.png" alt="" width="720">
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="bg-dark text-secondary px-4 py-5 text-center">
            <div class="py-5">
                <h1 class="display-5 fw-bold text-white">Dark mode hero</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="fs-5 mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                        <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <h1 class="my-5">Navbar</h1>
        <hr>

        <div class="container bg-white my-5">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                    <span class="fs-4">Simple header</span>
                </a>

                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                </ul>
            </header>
        </div>

        <div class="b-example-divider"></div>

        <div class="container bg-white">
            <header class="d-flex justify-content-center py-3">
                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                </ul>
            </header>
        </div>

        <div class="b-example-divider"></div>

        <div class="container bg-white my-5">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                </a>

                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="#" class="nav-link px-2 link-dark">Features</a></li>
                    <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
                    <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
                    <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
                </ul>

                <div class="col-md-3 text-end">
                    <button type="button" class="btn btn-outline-primary me-2">Login</button>
                    <button type="button" class="btn btn-primary">Sign-up</button>
                </div>
            </header>
        </div>

        <div class="b-example-divider"></div>

        <header class="p-3 bg-dark text-white my-5">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg   svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">About</a></li>
                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
                    </form>

                    <div class="text-end">
                        <button type="button" class="btn btn-outline-light me-2">Login</button>
                        <button type="button" class="btn btn-warning">Sign-up</button>
                    </div>
                </div>
            </div>
        </header>

        <div class="b-example-divider"></div>

        <header my-5>
            <div class="px-3 py-2 bg-dark text-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
                        </a>

                        <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                <a href="#" class="nav-link text-secondary">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#home"></use></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2"></use></svg>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#table"></use></svg>
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#grid"></use></svg>
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"></use></svg>
                                    Customers
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="px-3 py-2 border-bottom mb-3 bg-white">
                <div class="container d-flex flex-wrap justify-content-center">
                    <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
                        <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                    </form>

                    <div class="text-end">
                        <button type="button" class="btn btn-light text-dark me-2">Login</button>
                        <button type="button" class="btn btn-primary">Sign-up</button>
                    </div>
                </div>
            </div>
        </header>

        <h1 class="my-5">Features</h1>
        <hr>

        <div class="container-fluid px-4 py-5 bg-white" id="featured-3">
            <h2 class="pb-2 border-bottom">Columns with icons</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-archive" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="3" y="4" width="18" height="4" rx="2"></rect>
                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
                            <line x1="10" y1="12" x2="14" y2="12"></line>
                        </svg>
                    </div>
                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a href="#" class="icon-link">
                        Call to action
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
                    </a>
                </div>
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#people-circle"></use></svg>
                    </div>
                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a href="#" class="icon-link">
                        Call to action
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
                    </a>
                </div>
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
                    </div>
                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a href="#" class="icon-link">
                        Call to action
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="container-fluid px-4 py-5 bg-white my-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">Hanging icons</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="col d-flex align-items-start">
                    <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
                    </div>
                    <div>
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a href="#" class="btn btn-primary">
                            Primary button
                        </a>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#cpu-fill"></use></svg>
                    </div>
                    <div>
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a href="#" class="btn btn-primary">
                            Primary button
                        </a>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#tools"></use></svg>
                    </div>
                    <div>
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a href="#" class="btn btn-primary">
                            Primary button
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="container-fluid px-4 py-5 bg-white" id="custom-cards">
            <h2 class="pb-2 border-bottom">Custom cards</h2>

            <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-1.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                            <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                            <ul class="d-flex list-unstyled mt-auto">
                                <li class="me-auto">
                                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                                </li>
                                <li class="d-flex align-items-center me-3">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"></use></svg>
                                    <small>Earth</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#calendar3"></use></svg>
                                    <small>3d</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-2.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                            <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h2>
                            <ul class="d-flex list-unstyled mt-auto">
                                <li class="me-auto">
                                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                                </li>
                                <li class="d-flex align-items-center me-3">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"></use></svg>
                                    <small>Pakistan</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#calendar3"></use></svg>
                                    <small>4d</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-3.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                            <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h2>
                            <ul class="d-flex list-unstyled mt-auto">
                                <li class="me-auto">
                                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                                </li>
                                <li class="d-flex align-items-center me-3">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"></use></svg>
                                    <small>California</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#calendar3"></use></svg>
                                    <small>5d</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="b-example-divider"></div>

        <div class="container-fluid px-4 py-5 bg-white my-5" id="icon-grid">
            <h2 class="pb-2 border-bottom">Icon grid</h2>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#bootstrap"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#cpu-fill"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#speedometer2"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#tools"></use></svg>
                    <div>
                        <h4 class="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default{
    auth:false
}
</script>