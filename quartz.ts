import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"
import type { ExplorerOptions } from "./.quartz/plugins"

const sortCompetitorsByLastName: ExplorerOptions["sortFn"] = (a, b) => {
	if (a.isFolder !== b.isFolder) {
		return a.isFolder ? -1 : 1
	}

	const aSlug = a.slug?.toLowerCase() ?? ""
	const bSlug = b.slug?.toLowerCase() ?? ""
	const inCompetitorsTree = aSlug.startsWith("competitors/") && bSlug.startsWith("competitors/")

	if (!inCompetitorsTree || a.isFolder || b.isFolder) {
		return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
			numeric: true,
			sensitivity: "base",
		})
	}

	const aDisplayName = (a.displayName || "").trim()
	const bDisplayName = (b.displayName || "").trim()
	const aLastName = aDisplayName.split(/\s+/).at(-1) ?? ""
	const bLastName = bDisplayName.split(/\s+/).at(-1) ?? ""

	const lastNameCompare = aLastName.localeCompare(bLastName, undefined, {
		numeric: true,
		sensitivity: "base",
	})

	if (lastNameCompare !== 0) {
		return lastNameCompare
	}

	return aDisplayName.localeCompare(bDisplayName, undefined, {
		numeric: true,
		sensitivity: "base",
	})
}

ExternalPlugin.Explorer({
	sortFn: sortCompetitorsByLastName,
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
