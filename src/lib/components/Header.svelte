<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar rounded color="form">
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Adora</span>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/" active={true}>홈</NavLi>
    <NavLi href="/board">메모</NavLi>
  </NavUl>
</Navbar>
