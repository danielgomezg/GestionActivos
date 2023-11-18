<script>
import { Router, Link, Route } from "svelte-routing";
// import Login from "./views/login.svelte";
import Login from "./views/login/login.svelte"
import Home from "./views/home/Home.svelte";
import Movies from "./views/movies.svelte";
import {user} from "./stores/user"
import Nav from "./components/nav.svelte";
import Perfil from "./views/perfil.svelte";

</script>

<div class="theme-dark">
  <Router>
    <Route path="/" component={Login} />
    <Route path="/movies" component={Movies} />
    <Route path="/perfil" component={Perfil} /> 
    <Route path="/home" component={Home} />
  </Router>
</div>

<style>
  
</style>
