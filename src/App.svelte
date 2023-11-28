<script>
import { Router, Link, Route } from "svelte-routing";
// import Login from "./views/login.svelte";
import Login from "./views/login/login.svelte"
import Home from "./views/home/Home.svelte";
import Movies from "./views/movies.svelte";
import {user} from "./stores/user"
import Nav from "./components/nav.svelte";
import Perfil from "./views/perfil.svelte";
import Company from "./views/company/company.svelte";

import ContentCompany from "./components/company/contentCompany.svelte";

</script>

<div class="main theme-dark">  
  <!-- <Router>  
    <Route path="/login" component={Login} />
    <Route index path="/home" component={Home} />
    <Route path="/empresas" component={ContentCompany} />
    
  </Router> -->
  <Home />
</div>

<style>
  .main {

  }
  
</style>
