-- require("setup.plugin.telescope")
require("setup.plugin.treesitter")
require("setup.plugin.harpoon")
require("setup.plugin.undotree")
require("setup.plugin.lsp")
-- require("setup.plugin.oil")
require("setup.plugin.autoclose")
require("setup.plugin.mini-surround")
require("setup.plugin.messenger")
require("setup.plugin.fff")
-- require("setup.plugin.gruvbox")

require('gruvbox').setup({
    contrast = "hard",
    transparent_mode = true,
    palette_overrides = {
        light1 = "#fbf1c7",
        bright_red = "#fb4934",
        bright_green = "#b8bb26",
        bright_yellow = "#fabd2f",
        bright_blue = "#a1ccbc",
        bright_purple = "#d3869b",
        bright_aqua = "#8ec07c",
        bright_orange = "#fe8019"
    },
    overrides = {
        ["@function.method.call"] = { link = "GruvboxFg1" },
        ["@punctuation.bracket"] = { link = "GruvboxFg1" },
        ["@punctuation.delimiter"] = { link = "GruvboxFg1" }
    }
})

vim.opt.termguicolors = true
-- vim.cmd.colorscheme("oldworld")
-- vim.cmd.colorscheme("gruvbox")
vim.cmd.colorscheme 'gruber-darker'

vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "Function", { fg = "white" })
vim.api.nvim_set_hl(0, "@function.builtin", {})
vim.api.nvim_set_hl(0, "@tag.attribute", { fg = 'white' })
vim.api.nvim_set_hl(0, "@markup.heading", {})
vim.api.nvim_set_hl(0, "@module.go", {})
vim.api.nvim_set_hl(0, "@punctuation.bracket", {})

vim.api.nvim_set_hl(0, "@keyword.dockerfile", { link = "GruberDarkerQuartz", force = true })
vim.api.nvim_set_hl(0, "Constant", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@constant.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@variable.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@type.builtin", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@type.definition.go", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@boolean", { link = "GruberDarkerQuartz" })
vim.api.nvim_set_hl(0, "@property", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag.builtin", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "@tag.delimiter", { link = 'GruberDarkerQuartz' })
vim.api.nvim_set_hl(0, "Type", { link = 'GruberDarkerQuartz' })

vim.api.nvim_set_hl(0, "@property.json", {})
