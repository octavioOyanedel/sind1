<!-- NAV VERTICAL -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">

    <!-- LOGO -->
    <a href="index3.html" class="brand-link">
        <img src="\img\logo_verde.png" alt="Logo SIND1" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">SIND1</span>
    </a>
    <!-- /.LOGO -->

    <!-- CONTENIDO NAV VERTICAL -->
    <div class="sidebar">

        <!-- DESCRIPCIÓN USUARIO LOGEADO -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="\img\logo_blanco.png" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">Hola, Octavio</a>
            </div>
        </div>
        <!-- /.DESCRIPCIÓN USUARIO LOGEADO -->

        <!-- FORM BÚSQUEDA -->
        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Buscar" aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- /.FORM BÚSQUEDA -->

        <!-- ENLACES DE NAV VERTICAL -->
        <nav class="mt-2 enlaces-nav">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {{-- Enlaces socios --}}
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-users"></i>
                        <p>Socios<i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Socio</p></a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Carga</p></a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Estudio</p></a>
                        </li>
                    </ul>
                </li>
                {{-- Enlaces préstamos--}}
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-money-bill"></i>
                        <p>Préstamos</p>
                    </a>
                </li>
                {{-- Enlaces contabilidad--}}
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-file-invoice-dollar"></i>
                        <p>Contabilidad<i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Egresos</p></a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Ingresos</p></a>
                        </li>
                    </ul>
                </li>
                {{-- Enlaces administración --}}
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-users-cog"></i>
                        <p>Administración<i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Cambiar Contraseña</p></a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Mantenedor</p></a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><p>Historial</p></a>
                        </li>
                    </ul>
                </li>
                {{-- Enlaces sistema --}}
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-info-circle"></i>
                        <p>Info</p>
                    </a>
                </li> 
                {{-- Salir--}}
                <li class="nav-item has-treeview">
                    <a class="nav-link" href="{{ route('logout') }}"
                    onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();">
                        <i class="text-danger nav-icon fas fa-sign-out-alt"></i>
                        <p>Salir</p>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>                                                                     
            </ul>
        </nav>
        <!-- /.ENLACES DE NAV VERTICAL -->
    </div>
    <!-- /.CONTENIDO NAV VERTICAL -->
</aside>
<!-- /.NAV VERTICAL -->