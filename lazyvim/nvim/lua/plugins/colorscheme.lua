return {
  { "rose-pine/neovim", name = "rose-pine", opts = {
    disable_background = true,
  } },
  { "blazkowolf/gruber-darker.nvim" },
  -- Configure LazyVim to load gruvbox
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "gruber-darker",
    },
  },
}
