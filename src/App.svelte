<script>
import { Router, Link, Route } from "svelte-routing";
import Login from "./views/login.svelte";
import Movies from "./views/movies.svelte";
import {user} from "./stores/user"
import Nav from "./components/nav.svelte";
import Perfil from "./views/perfil.svelte";

</script>

<div>
  <Router>
    {#if $user}
       
    {/if}
    <Route path="/"> <Login></Login> </Route>
    <Route path="/movies"> <Movies></Movies> </Route>
    <Route path="/perfil"> <Perfil></Perfil> </Route>
  </Router>
</div>

<style>
  
</style>
