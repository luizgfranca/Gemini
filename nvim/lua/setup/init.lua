require("setup.plugin.telescope")
require("setup.plugin.treesitter")
require("setup.plugin.harpoon")
require("setup.plugin.undotree")
require("setup.plugin.lsp")
-- require("setup.plugin.oil")
require("setup.plugin.autoclose")
require("setup.plugin.mini-surround")

vim.opt.termguicolors = true
-- vim.cmd.colorscheme("oldworld")
vim.cmd.colorscheme 'gruber-darker'

vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "Function", { fg = "white" })
vim.api.nvim_set_hl(0, "Constant", { fg = "gray90" })
-- vim.api.nvim_set_hl(0, "Identifier", { fg = "#ff0000" })
vim.api.nvim_set_hl(0, "@property", { fg = "gray90" })
vim.api.nvim_set_hl(0, "Type", { fg = "gray85" })
