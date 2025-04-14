require("setup.plugin.telescope")
require("setup.plugin.treesitter")
require("setup.plugin.harpoon")
require("setup.plugin.undotree")
require("setup.plugin.lsp")
-- require("setup.plugin.oil")
require("setup.plugin.autoclose")
require("setup.plugin.mini-surround")
require("setup.plugin.messenger")

vim.opt.termguicolors = true
-- vim.cmd.colorscheme("oldworld")
vim.cmd.colorscheme 'gruber-darker'

vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "Function", { fg = "white" })
vim.api.nvim_set_hl(0, "@function.builtin", {})
vim.api.nvim_set_hl(0, "@tag.attribute", { fg = 'white' })
vim.api.nvim_set_hl(0, "@markup.heading", {})
vim.api.nvim_set_hl(0, "@module.go", {})

vim.api.nvim_set_hl(0, "Constant", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@constant.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@variable.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@type.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@boolean", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@property", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag.builtin", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag.delimiter", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "Type", { link = 'GruberDarkerQuartz' })

vim.api.nvim_set_hl(0, "@property.json", {})
