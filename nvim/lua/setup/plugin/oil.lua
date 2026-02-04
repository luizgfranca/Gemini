require("oil").setup({
  keymaps = {
    ["<C-p>"] = false,
    ["gp"] = "actions.preview",
  },
  watch_for_changes = true,
  view_options = {
    show_hidden = true
  }
})

vim.keymap.set("n", "-", "<CMD>Oil<CR>", { desc = "Open parent directory" })
